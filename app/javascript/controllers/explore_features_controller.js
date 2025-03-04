import { Controller } from "@hotwired/stimulus";

export default class extends Controller {

    validPersonalMobile = false;

    connect() {
        console.log("Explore New Techs controller connected!");

        document.addEventListener("turbo:load", () => {
            const phoneFormsContainer = document.getElementById("phone_forms_container");
            if (!phoneFormsContainer) return;

            phoneFormsContainer.addEventListener("click", (event) => {
            if (event.target.classList.contains("add-mobile")) {
                event.preventDefault();
                this.addPhoneNumber();
            }

            if (event.target.classList.contains("delete-mobile")) {
                event.preventDefault();
                this.deletePhoneNumber(event.target);
            }
            });
        });

        document.addEventListener("turbo:load", () => {
            const otherFormsContainer = document.getElementById("other_forms_container");
            if (!otherFormsContainer) return;

            otherFormsContainer.addEventListener("click", (event) => {
                if (event.target.classList.contains("add-other-contact")) {
                    event.preventDefault();
                    this.addOtherContact();
                }

                if (event.target.classList.contains("delete-other-contact")) {
                    event.preventDefault();
                    this.deleteOtherContact(event.target);
                }
            });
        });

        document.addEventListener("turbo:load", () => {
            const addressFormsContainer = document.getElementById("address_forms_container");
            console.log("addressFormsContainer = = = =", addressFormsContainer);
            if (!addressFormsContainer) return;

            addressFormsContainer.addEventListener("click", (event) => {
                if (event.target.classList.contains("add-address")) {
                    event.preventDefault();
                    this.addAddress();
                }

                if (event.target.classList.contains("delete-address")) {
                    event.preventDefault();
                    this.deleteAddress(event.target);
                }
            });
        });
        
        const mobileContainer = this.element.querySelectorAll(".mobile-numbers-section");
        const othercontactContainer = this.element.querySelectorAll(".other-contact-section");
        const addressContainer = this.element.querySelectorAll(".address-section");

        mobileContainer.forEach((container, containerIndex) => {
            console.log("inside mobileContainer = = = =", container);
            console.log("inside mobileContainerIndex = = = =", containerIndex);

            const mobile = container.querySelectorAll("[id^='user_contact_mobile_input_']");
            console.log("mobile = = = =", mobile);

            this.element.addEventListener("input", (event) => {
                const target = event.target;

                if (target.matches("[id^='user_contact_mobile_input_']")) {
                    console.log("Matched Input:", target);
                    console.log("Input Value:", target.value);
            
                    // Find the closest .mobile if needed
                    const numberInput = target.closest(".personal-mobile");
                    console.log("numberInput = = = =", numberInput);
                    if (numberInput) {
                        this.validateMobile(target);
                    }
                }
            });
        });

        othercontactContainer.forEach((othercontainer, othercontactIndex) => {
            console.log("inside othercontactContainer = = = =", othercontainer);
            console.log("inside othercontactContainerIndex = = = =", othercontactIndex);

            const othercontact = othercontainer.querySelectorAll("[id^='user_contact_others_input_']");
            console.log("othercontactInput = = = =", othercontact);

            this.element.addEventListener("input", (event) => {
                const target = event.target;

                if (target.matches("[id^='user_contact_others_input_']")) {
                    console.log("Matched Input:", target);
                    console.log("Input Value:", target.value);

                    // Find the closest .other-contact if needed
                    const otherInput = target.closest(".other-contact");
                    if (otherInput) {
                        // console.log("Other Input:", otherInput);
                        this.validateOtherContact(target);
                    }
                }
            });
        });


        addressContainer.forEach((container, containerIndex) => {
            console.log("inside addressContainer = = = =", container);
            console.log("inside addressContainerIndex = = = =", containerIndex);

            this.element.addEventListener("input", (event) => {
                const target = event.target;

                if (target.matches("[id^='user_contact_address_input_']")) {
                    console.log("Matched Address Input:", target);
                    console.log("Input Value:", target.value);

                    this.validateAddress(target);
                }
            });
        });

        
    }

    addPhoneNumber() {
    const phoneFormsContainer = document.getElementById("phone_forms_container");
    if (!phoneFormsContainer) return;

    const lastFieldSet = phoneFormsContainer.querySelector(".mobile-numbers-section:last-of-type");
    if (!lastFieldSet) return;

    const newFieldSet = lastFieldSet.cloneNode(true);
    const newIndex = Date.now();

    newFieldSet.querySelectorAll("input, select, button, div").forEach((input) => {
        if (input.tagName === "INPUT") input.value = "";
        if (input.name) input.name = input.name.replace(/\[\d+\]/, `[${newIndex}]`);
        if (input.id) input.id = input.id.replace(/_\d+/, `_${newIndex}`);
    });

    newFieldSet.querySelector(".add-mobile").classList.remove("hidden");
    newFieldSet.querySelector(".delete-mobile").classList.add("hidden");

    phoneFormsContainer.querySelectorAll(".mobile-numbers-section").forEach((section) => {
        section.querySelector(".add-mobile")?.classList.add("hidden");
        section.querySelector(".delete-mobile")?.classList.remove("hidden");
    });

    phoneFormsContainer.appendChild(newFieldSet);
    }

    deletePhoneNumber(button) {
    const section = button.closest(".mobile-numbers-section");
    if (!section) return;

    const destroyField = section.querySelector(".hidden-destroy");
    if (destroyField) {
        destroyField.value = "1";
        section.style.display = "none";
    }
    }

    addOtherContact() {
        const otherFormsContainer = document.getElementById("other_forms_container");
        if (!otherFormsContainer) return;

        const lastFieldSet = otherFormsContainer.querySelector(".other-contact-section:last-of-type");
        if (!lastFieldSet) return;

        const newFieldSet = lastFieldSet.cloneNode(true);
        const newIndex = Date.now();

        newFieldSet.querySelectorAll("input, select, button, div").forEach((input) => {
            if (input.tagName === "INPUT") input.value = "";
            if (input.name) input.name = input.name.replace(/\[\d+\]/, `[${newIndex}]`);
            if (input.id) input.id = input.id.replace(/_\d+/, `_${newIndex}`);
        });

        newFieldSet.querySelector(".add-other-contact").classList.remove("hidden");
        newFieldSet.querySelector(".delete-other-contact").classList.add("hidden");

        otherFormsContainer.querySelectorAll(".other-contact-section").forEach((section) => {
            section.querySelector(".add-other-contact")?.classList.add("hidden");
            section.querySelector(".delete-other-contact")?.classList.remove("hidden");
        });

        otherFormsContainer.appendChild(newFieldSet);
    }

    deleteOtherContact(button) {
        const section = button.closest(".other-contact-section");
        if (!section) return;

        const destroyField = section.querySelector(".hidden-destroy");
        if (destroyField) {
            destroyField.value = "1";
            section.style.display = "none";
        }
    }

    addAddress() {
        const addressFormsContainer = document.getElementById("address_forms_container");
        if (!addressFormsContainer) return;
    
        const lastFieldSet = addressFormsContainer.querySelector(".address-section:last-of-type");
        if (!lastFieldSet) return;
    
        const newFieldSet = lastFieldSet.cloneNode(true);
        const newIndex = Date.now();
    
        newFieldSet.querySelectorAll("input, select, button, div").forEach((input) => {
            if (input.tagName === "INPUT") input.value = "";
            if (input.name) input.name = input.name.replace(/\[\d+\]/, `[${newIndex}]`);
            if (input.id) input.id = input.id.replace(/_\d+/, `_${newIndex}`);
        });
    
        newFieldSet.querySelector(".add-address").classList.remove("hidden");
        newFieldSet.querySelector(".delete-address").classList.add("hidden");
    
        addressFormsContainer.querySelectorAll(".address-section").forEach((section) => {
            section.querySelector(".add-address")?.classList.add("hidden");
            section.querySelector(".delete-address")?.classList.remove("hidden");
        });
    
        addressFormsContainer.appendChild(newFieldSet);
    }

    deleteAddress(button) {
        const section = button.closest(".address-section");
        if (!section) return;
    
        const destroyField = section.querySelector(".hidden-destroy");
        if (destroyField) {
            destroyField.value = "1";
            section.style.display = "none";
        }
    }
    

    validateMobile(element) {
        // Find the closest '.mobile-numbers-section' container
        const parentDiv = element.closest(".mobile-numbers-section");

        if (!parentDiv) {
            console.error("Parent '.mobile-numbers-section' not found.");
            return false;
        }

        const personalMobile = parentDiv.querySelector("[id^='user_contact_mobile_input_']");
        const personalMobileLabel = document.getElementById("personal_mobile_label");
        const personalMobileError1 = parentDiv.querySelector("[id^='personal_mobile_empty_error_']");
        const personalMobileError2 = parentDiv.querySelector("[id^='personal_mobile_length_error_']");

        console.log("Personal Mobile Error1:", personalMobileError1);
        console.log("Personal Mobile Error2:", personalMobileError2);

        console.log("Personal Mobile:", personalMobile.value.trim());

        if (!personalMobile || personalMobile.value.trim() == "") {
            
            this.validPersonalMobile = false;
            console.log("Error: Personal Mobile is empty");
            personalMobileLabel.classList.add("error_label");
            personalMobileError1.classList.remove("hidden");
            personalMobileError2.classList.add("hidden");
        } else if (personalMobile.value.trim().length < 10) {
            // Case: Less than 10 digits
            this.validPersonalMobile = false;
            console.log("Error: Personal Mobile length is invalid (less than 10 digits)");
            personalMobileLabel.classList.add("error_label");
            personalMobileError1.classList.add("hidden");
            personalMobileError2.classList.remove("hidden");
        } else {
            console.log("Personal Mobile is valid");
            this.validPersonalMobile = true;
            personalMobileLabel.classList.remove("error_label");
            personalMobileError1.classList.add("hidden");
            personalMobileError2.classList.add("hidden");
        }
        return this.validPersonalMobile;
    }

    validateOtherContact(element) {
        // Find the closest '.other-contact' container
        const parentDiv = element.closest(".other-contact");

        if (!parentDiv) {
            console.error("Parent '.other-contact' not found.");
            return false;
        }

        const otherContact = parentDiv.querySelector("[id^='user_contact_others_input_']");
        const otherContactLabel = document.getElementById("other_contact_label");
        const otherContactError1 = parentDiv.querySelector("[id^='other_contacts_empty_error_']");
        const otherContactError2 = parentDiv.querySelector("[id^='other_contacts_length_error_']");

        console.log("Other Contact:", otherContact.value.trim());

        console.log("Other Contact Error1:", otherContactError1);
        console.log("Other Contact Error2:", otherContactError2);

        if (!otherContact || otherContact.value.trim() == "") {
            this.validOtherContact = false;
            console.log("Error: Other Contact is empty");
            otherContactLabel.classList.add("error_label");
            otherContactError1.classList.remove("hidden");
            otherContactError2.classList.add("hidden");
        } else if (otherContact.value.trim().length < 5) {
            // Case: Less than 10 digits
            this.validOtherContact = false;
            console.log("Error: Other Contact length is invalid (less than 10 digits)");
            otherContactLabel.classList.add("error_label");
            otherContactError1.classList.add("hidden");
            otherContactError2.classList.remove("hidden");
        } else {
            console.log("Other Contact is valid");
            this.validOtherContact = true;
            otherContactLabel.classList.remove("error_label");
            otherContactError1.classList.add("hidden");
            otherContactError2.classList.add("hidden");
        }
        return this.validOtherContact;
    }

    validateAddress(element) {
        // Find the closest '.address-section' container
        const parentDiv = element.closest(".address-section");
    
        if (!parentDiv) {
            console.error("Parent '.address-section' not found.");
            return false;
        }
    
        // Get Address Line 1
        const addressLine1 = parentDiv.querySelector("[id^='user_contact_address_line_1_input_']");
        const addressLabel = document.getElementById("address_label");
        const addressError1 = parentDiv.querySelector("[id^='address_line_1_empty_error_']");
        const addressError2 = parentDiv.querySelector("[id^='address_line_1_length_error_']");
    
        // Get Pin Code
        const pinCode = parentDiv.querySelector("[id^='user_contact_pin_code_input_']");
        const pinCodeLabel = document.getElementById("pin_code_label");
        const pinCodeError1 = parentDiv.querySelector("[id^='pin_code_empty_error_']");
        const pinCodeError2 = parentDiv.querySelector("[id^='pin_code_invalid_error_']");
    
        // Get City
        const city = parentDiv.querySelector("[id^='user_contact_city_input_']");
        const cityLabel = document.getElementById("city_label");
        const cityError = parentDiv.querySelector("[id^='city_empty_error_']");
    
        let isValid = true;
    
        // Validate Address Line 1
        if (!addressLine1 || addressLine1.value.trim() === "") {
            console.log("Error: Address Line 1 is empty");
            isValid = false;
            addressLabel.classList.add("error_label");
            addressError1.classList.remove("hidden");
            addressError2.classList.add("hidden");
        } else if (addressLine1.value.trim().length < 5) {
            console.log("Error: Address Line 1 must be at least 5 characters");
            isValid = false;
            addressLabel.classList.add("error_label");
            addressError1.classList.add("hidden");
            addressError2.classList.remove("hidden");
        } else {
            addressLabel.classList.remove("error_label");
            addressError1.classList.add("hidden");
            addressError2.classList.add("hidden");
        }
    
        // Validate Pin Code
        if (!pinCode || pinCode.value.trim() === "") {
            console.log("Error: Pin Code is empty");
            isValid = false;
            pinCodeLabel.classList.add("error_label");
            pinCodeError1.classList.remove("hidden");
            pinCodeError2.classList.add("hidden");
        } else if (!/^\d{6}$/.test(pinCode.value.trim())) {
            console.log("Error: Pin Code must be exactly 6 digits");
            isValid = false;
            pinCodeLabel.classList.add("error_label");
            pinCodeError1.classList.add("hidden");
            pinCodeError2.classList.remove("hidden");
        } else {
            pinCodeLabel.classList.remove("error_label");
            pinCodeError1.classList.add("hidden");
            pinCodeError2.classList.add("hidden");
        }
    
        // Validate City
        if (!city || city.value.trim() === "") {
            console.log("Error: City is empty");
            isValid = false;
            cityLabel.classList.add("error_label");
            cityError.classList.remove("hidden");
        } else {
            cityLabel.classList.remove("error_label");
            cityError.classList.add("hidden");
        }
    
        return isValid;
    }
    
    
}



// document.addEventListener('turbo:load', function () {
//     const contactTemplate = `
//       <div class="contact-group mb-3 p-3 border rounded bg-gray-50">
//         <label class="font-bold">Label:</label>
//         <input type="text" name="user[contacts][][label]" class="w-full bg-white px-2 py-1 border rounded focus:outline-none focus:ring-2">

//         <label class="font-bold">Contact:</label>
//         <input type="text" name="user[contacts][][value]" class="w-full bg-white px-2 py-1 border rounded focus:outline-none focus:ring-2">

//         <button type="button" class="remove-contact text-red-500 hover:text-red-700 mt-2">Remove</button>
//       </div>
//     `;

//     const emailTemplate = `
//       <div class="email-group mb-3 p-3 border rounded bg-gray-50">
//         <label class="font-bold">Email:</label>
//         <input type="email" name="user[emails][]" class="w-full bg-white px-2 py-1 border rounded focus:outline-none focus:ring-2">
//         <button type="button" class="remove-email text-red-500 hover:text-red-700 mt-2">Remove</button>
//       </div>
//     `;

//     document.getElementById("add-contact").addEventListener("click", function () {
//       document.getElementById("contacts-fields").insertAdjacentHTML("beforeend", contactTemplate);
//     });

//     document.getElementById("add-email").addEventListener("click", function () {
//       document.getElementById("emails-fields").insertAdjacentHTML("beforeend", emailTemplate);
//     });

//     document.addEventListener("click", function (e) {
//       if (e.target.classList.contains("remove-contact")) {
//         e.target.parentElement.remove();
//         e.preventDefault();
//       }
//       if (e.target.classList.contains("remove-email")) {
//         e.target.parentElement.remove();
//         e.preventDefault();
//       }
//     });
//   });
