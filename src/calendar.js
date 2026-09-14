import React, { Component } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import CalendarDays from './calendar_days';
import './calendar.css';
import { Typography, Grid } from '@mui/material';

export default class Calendar extends Component {
  constructor() {
    super();

    this.weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    this.state = {
      currentDay: new Date()
    }
  }

  changeCurrentDay = (day) => {
    this.setState({ currentDay: new Date(day.year, day.month, day.number) });
  }

  nextDay = () => {
    this.setState({ currentDay: new Date(this.state.currentDay.setDate(this.state.currentDay.getDate() + 1)) });
  }

  previousDay = () => {
    this.setState({ currentDay: new Date(this.state.currentDay.setDate(this.state.currentDay.getDate() - 1)) });
  }

  render() {
    return (
      <Box sx={{ width: 900, height: 600, display: 'flex', flexDirection: 'column' }}>
        <Box className="calendar-header">
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography sx={{ fontSize: 30, fontWeight: 'bold', color: '#146eb4' }}>
                {this.months[this.state.currentDay.getMonth()]} {this.state.currentDay.getFullYear()}
              </Typography>
            </Grid>
            <Grid item className="tools">
              <button onClick={this.previousDay}>
                <ArrowCircleLeftOutlinedIcon fontSize='large' />
              </button>
              <Typography fontWeight="bold">
                {this.months[this.state.currentDay.getMonth()].substring(0, 3)} {this.state.currentDay.getDate()}
              </Typography>
              <button onClick={this.nextDay}>
                <ArrowCircleRightOutlinedIcon fontSize='large' />
              </button>
            </Grid>
          </Grid>
        </Box>
        <Box className="calendar-body">
          <Box className="table-header">
            {this.weekdays.map((weekday) => (
              <Box className="weekday" key={weekday}>
                <Typography>{weekday}</Typography>
              </Box>
            ))}
          </Box>
          <CalendarDays day={this.state.currentDay} changeCurrentDay={this.changeCurrentDay} />
        </Box>
      </Box>
    )
  }
}
