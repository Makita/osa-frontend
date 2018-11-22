/* eslint no-undef: 0, no-unused-vars: 0, init-declarations: 0 */
import * as React from 'react';
import AppointmentForm from './appointment-form';

describe("AppointmentForm", () => {
  describe("formatPhoneNumber", () => {
    const wrapper = mount(<AppointmentForm />);

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