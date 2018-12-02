/* eslint no-undef: 0, no-unused-vars: 0, init-declarations: 0 */
import * as React from 'react';
import { combineReducers, createStore } from 'redux';
import appointments from "Reducers/appointments"; // eslint-disable-line import/no-unresolved
import { fetchAppointments } from 'Actions/appointments';
import { AppointmentForm } from './appointment-form';

jest.mock('Actions/appointments')

const mainReducer = combineReducers({ appointments });

describe("AppointmentForm", () => {
  fetch.mockResponse(JSON.stringify({}));

  describe("formatPhoneNumber", () => {
    const wrapper = shallow(<AppointmentForm appointments={{}} store={createStore(mainReducer)} />);

    test("formats a phone number properly", () => {
      const event = { target: { value: "1234567890" } };

      wrapper.find({ id: "formControlsPhoneNumber" }).simulate("change", event);

      expect(wrapper.state("phoneNumber")).toBe("123-456-7890");
    })

    test("doesn't have a hyphen at the end of three numbers", () => {
      const event = { target: { value: "123" } };

      wrapper.find({ id: "formControlsPhoneNumber" }).simulate("change", event);

      expect(wrapper.state("phoneNumber")).toBe("123");
    });

    test("doesn't have a hyphen at the end of six numbers", () => {
      const event = { target: { value: "123456" } };

      wrapper.find({ id: "formControlsPhoneNumber" }).simulate("change", event);

      expect(wrapper.state("phoneNumber")).toBe("123-456");
    });

    test("doesn't have a hyphen when removing the only number", () => {
      const event = { target: { value: "" } };

      wrapper.find({ id: "formControlsPhoneNumber" }).simulate("change", event);

      expect(wrapper.state("phoneNumber")).toBe("");
    })
  });
});