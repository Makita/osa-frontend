// @flow
/* eslint-disable no-magic-numbers, no-invalid-this, max-statements */
/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import addDays from 'date-fns/add_days';
import addMonths from 'date-fns/add_months';
import endOfMonth from 'date-fns/end_of_month';
import endOfWeek from 'date-fns/end_of_week';
import format from 'date-fns/format';
import getDate from 'date-fns/get_date';
import isSameDay from 'date-fns/is_same_day';
import isSameMonth from 'date-fns/is_same_month';
import parse from 'date-fns/parse';
import setDate from 'date-fns/set_date';
import startOfMonth from 'date-fns/start_of_month';
import startOfWeek from 'date-fns/start_of_week';
import subMonths from 'date-fns/sub_months';

import NavbarSpacer from 'Components/NavbarSpacer/navbar-spacer';
import CalendarModal from './CalendarModal/calendar-modal';

import style from './calendar.scss';

/**
 * Render the two navigation chevrons and the month name.
 * @param {Date} currentMonth The month that the calendar is currently rendering.
 * @param {Function} prevMonth A function that subtracts from the month being rendered.
 * @param {Function} nextMonth A function that adds to the month being rendered.
 * @returns {JSX.Element} The Calendar Header component.
 */
const CalendarHeader = ({
  currentMonth,
  prevMonth,
  nextMonth,
}: {
  currentMonth: Date,
  prevMonth: () => void,
  nextMonth: () => void,
}) => {
  return (
    <div className={style.month_header}>
      <div className={style.left_column}>
        <div
          className={style.icon}
          role="button"
          onClick={prevMonth}
          tabIndex={0}
        >
          chevron_left
        </div>
      </div>
      <div className={style.middle_column}>
        <span>
          {format(currentMonth, 'MMMM YYYY')}
        </span>
      </div>
      <div className={style.right_column}>
        <div
          className={style.icon}
          role="button"
          onClick={nextMonth}
          tabIndex={-1}
        >
          chevron_right
        </div>
      </div>
    </div>
  );
}

/**
 * Renders the day names (Sunday, Monday, etc.) headers.
 * @param {Date} currentMonth The month that the calendar is currently rendering.
 * @return {JSX.Element} The Calendar Days component.
 */
const CalendarDays = ({
  currentMonth
}: {
  currentMonth: Date
}) => {
  const days = [];
  const startDate = startOfWeek(currentMonth);

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className={style.day_column} key={i}>
        {format(addDays(startDate, i), 'dddd')}
      </div>
    );
  }

  return <div className={style.days_row}>{days}</div>;
}

/**
 * Renders each specific date within the month being rendered.
 * @param {Date} currentMonth The month that the calendar is currently rendering.
 * @param {Date} selectedDate Which of the dates is currently active (fancy styling).
 * @param {Function} onDateClick Triggered when a cell is clicked.
 * @return {JSX.Element} The Calendar Cells component.
 */
const CalendarCells = ({
  currentMonth,
  selectedDate,
  onDateClick
}: {
  currentMonth: Date,
  selectedDate: Date,
  onDateClick: () => void
}) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, 'D');
      const cloneDay = day;
      let cellClass = "";

      if (!isSameMonth(day, monthStart)) cellClass = style.disabled;
      else if (isSameDay(day, selectedDate)) cellClass = style.selected;

      days.push(
        <div
          className={`${style.cell} ${cellClass}`}
          key={day}
          onClick={() => onDateClick(parse(cloneDay))}
        >
          <span className={style.cell_number}>{formattedDate}</span>
          <span className={style.cell_bg}>{formattedDate}</span>
        </div>
      );

      day = addDays(day, 1);
    }

    rows.push(<div className={style.cells_row} key={day}>{days}</div>);
    days = [];
  }

  return <div>{rows}</div>;
}

const MobileCalendarCells = ({
  currentMonth,
  selectedDate,
  onDateClick
}: {
  currentMonth: Date,
  selectedDate: Date,
  onDateClick: () => void
}) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const rows = [];
  let day = monthStart;

  while (day < monthEnd) {
    let cellClass = "";
    const cloneDay = day;

    if (isSameDay(day, selectedDate)) cellClass = style.selected;

    rows.push(
      <div className={style.cells_row} key={day}>
        <div
          className={`${style.mobile_cell} ${cellClass}`}
          key={day}
          onClick={() => onDateClick(parse(cloneDay))}
        >
          <span className={style.cell_number}>{format(day, 'D')}</span>
          <span className={style.cell_bg}>{format(day, 'ddd')}</span>
        </div>
      </div>
    );

    day = addDays(day, 1);
  }

  return <div>{rows}</div>;
};

/**
 * The base calendar class. Arranges the the other components and handles all state.
 */
export default class Calendar extends Component {
  state = {
    currentMonth: new Date(),
    selectedDate: new Date(),
    showModal: false,
    normalCalendarDisplay: true
  }

  componentDidMount() {
    window.addEventListener('resize', this.checkScreenSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkScreenSize);
  }

  /**
   * Sets a state boolean for whether the screen is large enough to display the normal calendar.
   * @returns {void}
   */
  checkScreenSize = () => {
    this.setState({ normalCalendarDisplay: window.innerWidth > 1000 });
  }

  /**
   * Fired when the left chevron is clicked in the month header.
   * @returns {void}
   */
  prevMonth = () => {
    this.setState((state) => {
      return { currentMonth: subMonths(state.currentMonth, 1) };
    });
  };

  /**
   * Fired when the right chevron is clicked in the month header.
   * @returns {void}
   */
  nextMonth = () => {
    this.setState((state) => {
      return { currentMonth: addMonths(state.currentMonth, 1) };
    });
  };

  /**
   * Handles what happens when a cell is clicked.
   * @param {number} day The day of the month that was clicked.
   * @returns {void}
   */
  onDateClick = (day) => {
    const { currentMonth } = this.state;
    let selected = parse(currentMonth);

    selected = setDate(selected, getDate(day));

    this.dateString = format(selected);

    this.setState({
      selectedDate: day,
      showModal: true,
    });
  };

  /**
   * Closes the Calendar Modal component.
   * @returns {void}
   */
  handleClose = () => {
    this.setState({ showModal: false });
  }

  render() {
    const {
      normalCalendarDisplay,
      currentMonth,
      selectedDate,
      showModal
    } = this.state;

    if (!normalCalendarDisplay) {
      return (
        <div className={style.container}>
          <CalendarHeader
            currentMonth={currentMonth}
            prevMonth={this.prevMonth}
            nextMonth={this.nextMonth}
          />
          <MobileCalendarCells
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            onDateClick={this.onDateClick}
          />
          <CalendarModal
            selectedDate={selectedDate}
            showModal={showModal}
            handleClose={this.handleClose}
          />
        </div>
      );
    }

    return (
      <div className={style.container}>
        <NavbarSpacer />
        <CalendarHeader
          currentMonth={currentMonth}
          prevMonth={this.prevMonth}
          nextMonth={this.nextMonth}
        />
        <CalendarDays currentMonth={currentMonth} />
        <CalendarCells
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onDateClick={this.onDateClick}
        />
        <CalendarModal
          selectedDate={selectedDate}
          showModal={showModal}
          handleClose={this.handleClose}
        />
      </div>
    );
  }
}