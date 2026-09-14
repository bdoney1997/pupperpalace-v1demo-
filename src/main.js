const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.resolve(__dirname, '../../PupperPalace.sqlite');
const db = new sqlite3.Database(dbPath);
 
 
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}
 
function createWindow () {
 
 
 
  // Create a new BrowserWindow
  const win = new BrowserWindow({
    width: 1600,
    height: 1200,
    icon: __dirname + '/Icon/Icon.icns',
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });
 
  // Load the login page when the app is launched
  //win.loadFile('./src/Login.html')
  win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
 
  };
 
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);
 
// Listen for the IPC request for customer data
ipcMain.on('request-cust-data', (event) => {
    const query = `
    SELECT 
        c.customer_id, 
        c.customer_first, 
        c.customer_last, 
        c.customer_phone, 
        GROUP_CONCAT(p.pet_name, '; ') AS pets
    FROM CUSTOMER c 
    LEFT JOIN Pet p ON c.customer_id = p.pet_owner
    GROUP BY c.customer_id, c.customer_first, c.customer_last, c.customer_phone`;

    /*
    const query = `
        SELECT 
            c.customer_id, 
            c.customer_first, 
            c.customer_last, 
            c.customer_phone, 
            p.pet_name 
        FROM CUSTOMER c 
        LEFT JOIN Pet p ON c.customer_id = p.pet_owner`;
    */

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching Customer data from database:', err.message);
            event.reply('cust-data-from-database', []); // Send an empty array
        } else {
            event.reply('cust-data-from-database', rows); // Send data
        }
    });
});
 
 

ipcMain.on('login', async (event, username, password) => {
  try {
    const isAuthenticated = await authenticateUser(username, password);
    event.sender.send('login-reply', isAuthenticated);
    console.log(`isAuthenticated: ${isAuthenticated}`);
  } catch (error) {
    event.sender.send('login-error', error.message);
  }
});


// Listen for the IPC request for pet data
ipcMain.on('request-pet-data', (event) => {
  const query = 'SELECT p.pet_id, p.pet_name, p.pet_owner, p.pet_breed, p.pet_health, p.pet_sex, p.age, c.customer_first, c.customer_last FROM PET p INNER JOIN Customer c ON p.pet_owner = c.customer_id';
 
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error fetching pet data from database:', err.message);
      event.reply('pet-data-from-database', []); // Send an empty array
    } else {
      event.reply('pet-data-from-database', rows); // Send data
    }
  });
});

ipcMain.on('update-appointment-status', (event, data) => {
  const { id, status } = data;
  // Update the status in db
  const sql = 'UPDATE Appointment SET status = ? WHERE appt_number = ?';

  db.run(sql, [status, id], (err) => {
    if (err) {
      console.error('Error updating appointment status:', err.message);
    } else {
      console.log('Status updated successfully');
    }
  });
});
 
ipcMain.on('request-appt-data', (event) => {
    // Query the database to get data
    const query = `
        SELECT 
            A.appt_number, 
            A.check_in, 
            A.check_out, 
            A.customer_id, 
            A.notes, 
            A.status, 
            A.assigned_by, 
            C.customer_first, 
            C.customer_last, 
            C.customer_phone, 
            P.pet_name, 
            E.employee_first, 
            E.employee_last 
        FROM Appointment A 
        INNER JOIN Customer C ON A.customer_id = C.customer_id 
        INNER JOIN pet P ON A.pet_id = P.pet_id 
        INNER JOIN Employee E ON E.employee_id = A.assigned_by`;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching appt data from database:', err.message);
            event.reply('appt-data-from-database', []); // Send an empty array
        } else {
            event.reply('appt-data-from-database', rows); // Send data
        }
    });
});

ipcMain.on('request-current-pets', (event) => {
    // Query the database to get data
    const query = `
        SELECT 
	        P.pet_name || ' pickup on ' || 
	        substr('JanFebMarAprMayJunJulAugSepOctNovDec', (strftime('%m', A.check_out / 1000, 'unixepoch') - 1) * 3 + 1, 3) || ' ' ||
	        strftime('%d %H:%M', A.check_out / 1000 - 28800, 'unixepoch') || ' by ' || 
	        C.customer_first || ' ' || C.customer_last AS appt_data, 
	        A.appt_number AS id 
        FROM Appointment A 
        INNER JOIN Customer C ON A.customer_id = C.customer_id 
        INNER JOIN pet P ON A.pet_id = P.pet_id 
        WHERE status = 'Checked-In'`;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching current-pets-data from database:', err.message);
            event.reply('current-pet-data', []); // Send an empty array
        } else {
            event.reply('current-pet-data', rows); // Send data
        }
    });
});

ipcMain.on('request-upcoming-appt', (event) => {
    // Query the database to get data
    const query = `
        SELECT 
            C.customer_first || ' ' || C.customer_last || 
            ' with ' || P.pet_name || ' on ' || 
            substr('JanFebMarAprMayJunJulAugSepOctNovDec', (strftime('%m', A.check_in / 1000, 'unixepoch') - 1) * 3 + 1, 3) || ' ' || 
            strftime('%d %H:%M', A.check_in / 1000 - 28800, 'unixepoch') AS appt_data, 
            A.appt_number AS id 
        FROM Appointment A 
        INNER JOIN Customer C ON A.customer_id = C.customer_id 
        INNER JOIN pet P ON A.pet_id = P.pet_id 
        WHERE status = 'Pending'`;

    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching upcoming-appt-data from database:', err.message);
            event.reply('upcoming-appt-data', []); // Send an empty array
        } else {
            event.reply('upcoming-appt-data', rows); // Send data
        }
    });
});
 
ipcMain.on('request-employee-data', (event) => {
  // Query the database to get data
  const query = 'SELECT employee_id, employee_first, employee_last FROM Employee;';
 
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error fetching employee data from database:', err.message);
      event.reply('employee-data', []); // Send an empty array
    } else {
      event.reply('employee-data', rows); // Send data
    }
  });
});
 
//adding customer information 
ipcMain.on('add-cust', async (event, custData) => {
    let { fname, lname, phone } = custData;
    const query = `
        INSERT INTO Customer ( customer_first, customer_last, customer_phone, customer_id)
        SELECT
          ? AS customer_first,
          ? AS customer_last,
          ? AS customer_phone,
          IFNULL((SELECT MAX(customer_id) + 1 FROM Customer), 1) AS customer_id`;

    db.run(query, [fname, lname, phone], (err) => {
        if (err) {
            console.error(err.message);
        }
    });
});

//adding employee information 
ipcMain.on('add-emp', async (event, empData) => {
    let { fname, lname, pass } = empData;
    const query = `
        INSERT INTO Employee ( employee_first, employee_last, employee_password, employee_id)
        SELECT
          ? AS employee_first,
          ? AS employee_last,
          ? AS employee_password,
          IFNULL((SELECT MAX(employee_id) + 1 FROM Employee), 1) AS employee_id`;

    db.run(query, [fname, lname, pass], (err) => {
        if (err) {
            console.error(err.message);
        }
    });
});

ipcMain.on('add-pet', async (event, petData) => {

    let { petName, petBreed, petHealth, petSex, petOwner, petAge } = petData;

    try {
        // Validate Customer in DB
        petOwner = await verifyEntry('Customer', 'customer_id', petOwner, db);

        insertPet(petName, petBreed, petHealth, petSex, petOwner, petAge);
    } catch (error) {
        console.error(error);
        // Handle any errors here
    }
});

function insertPet(petName, petBreed, petHealth, petSex, petOwner, petAge) {
    const query = `
        INSERT INTO Pet (pet_name, pet_breed, pet_health, pet_sex, pet_owner, age, pet_id)
        SELECT
          ? AS pet_name,
          ? AS pet_breed,
          ? AS pet_health,
          ? AS pet_sex,
          ? AS pet_owner,
          ? as age,
          IFNULL((SELECT MAX(pet_id) + 1 FROM Pet), 1) AS pet_id`;

    db.run(query, [petName, petBreed, petHealth, petSex, petOwner, petAge], (err) => {
        if (err) {
            console.error(err.message);
        }
    });
}

ipcMain.on('add-appt', async (event, apptData) => {
    let { technician, customer, pet, notes, check_in, check_out } = apptData;

    try {
        // Validate Customer in DB
        customer = await verifyEntry('Customer', 'customer_id', customer, db);

        // Validate Employee in DB
        technician = await verifyEntry('Employee', 'employee_id', technician, db);

        // Validate Pet in DB
        pet = await verifyEntry('Pet', 'pet_id', pet, db);

        insertAppointment(event, technician, customer, pet, notes, check_in, check_out);
    } catch (error) {
        console.error(error);
        // Handle any errors here
    }
});

function insertAppointment(event, technician, customer, pet, notes, check_in, check_out) {
    const query = `
        INSERT INTO Appointment (assigned_by, customer_id, pet_id, notes, check_in, check_out, status, appt_number)
        SELECT
          ? AS assigned_by,
          ? AS customer_id,
          ? AS pet_id,
          ? AS notes,
          ? AS check_in,
          ? AS check_out,
          'Pending' AS status,
          IFNULL((SELECT MAX(appt_number) + 1 FROM Appointment), 1) AS appt_number`;

    db.run(query, [technician, customer, pet, notes, check_in, check_out], (err) => {
        if (err) {
            console.error(err.message);
        }
    });
}

//This function is meant for adding appointments to check validity of customer/employee
//Queries the db to verify customer/employee exists
//If it doesn't exist it auto picks the first entry
//If no entries are present, it returns null
function verifyEntry(tableName, columnName, specifiedValue, db) {
    return new Promise((resolve, reject) => {
        const checkQuery = `SELECT ${columnName} FROM ${tableName} WHERE ${columnName} = ?`;
        db.get(checkQuery, [specifiedValue], (err, row) => {
            if (err) {
                console.error(err.message);
                reject(err);
            } else if (row) {
                // Entry exists, return value
                resolve(specifiedValue);
            } else {
                // The entry does not exist, find the value of the first entry
                const findFirstQuery = `SELECT ${columnName} FROM ${tableName} LIMIT 1`;
                db.get(findFirstQuery, [], (err, firstRow) => {
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    } else if (firstRow) {
                        // The first entry exists, return its value
                        resolve(firstRow[columnName]);
                    } else {
                        // No entries are found in the table
                        resolve(null);
                    }
                });
            }
        });
    });
}
 
function authenticateUser(username, password) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM Employee WHERE employee_id = ? AND employee_password = ?', [username, password], (err, row) => {
      if (err) {
        reject(err);
      } else if (!row) {
        resolve(false);
  		 //dialog.showErrorBox('Error', 'Invalid Credentials')
 
      } else {
        resolve(true);
        //dialog.showMessageBox(null, {
 		 //type: 'none',
 		 //message: 'SUCCESSFUL LOGIN'
		//})
 
      }
    });
  });
}
 
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
 
app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
 
 
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.