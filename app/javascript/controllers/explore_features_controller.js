import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
    validPersonalMobile = false;
    validOtherContact = false;
    validAddress = false;

    connect() {
        console.log("Explore Features controller connected!");

        document.addEventListener("turbo:load", () => {
            this.setupEventListeners("#phone_forms_container", "add-mobile", "delete-mobile", this.addPhoneNumber.bind(this), this.deletePhoneNumber.bind(this));
            this.setupEventListeners("#other_forms_container", "add-other-contact", "delete-other-contact", this.addOtherContact.bind(this), this.deleteOtherContact.bind(this));
            this.setupEventListeners("#address_form_container", "add-address", "delete-address", this.addAddress.bind(this), this.deleteAddress.bind(this));
        });

        this.setupValidation("#phone_forms_container", "mobile", this.validateMobile.bind(this));
        this.setupValidation("#other_forms_container", "others", this.validateOtherContact.bind(this));
        this.setupValidation("#address_form_container", "address_line_1", this.validateAddress.bind(this));
    }

    setupEventListeners(containerSelector, addClass, deleteClass, addFunction, deleteFunction) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        container.addEventListener("click", (event) => {
            if (event.target.classList.contains(addClass)) {
                event.preventDefault();
                addFunction();
            }

            if (event.target.classList.contains(deleteClass)) {
                event.preventDefault();
                deleteFunction(event.target);
            }
        });
    }

    setupValidation(containerSelector, inputNamePart, validateFunction) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        container.addEventListener("input", (event) => {
            if (event.target.matches(`[id^='user_contacts_attributes_'][id$='_${inputNamePart}']`) || 
                event.target.matches(`[id^='user_addresses_attributes_'][id$='_${inputNamePart}']`)) {
                validateFunction(event.target);
            }
        });
    }

    addField(containerSelector, fieldClass, addButtonClass, deleteButtonClass) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        const lastFieldSet = container.querySelector(`.${fieldClass}:last-of-type`);
        if (!lastFieldSet) return;

        const newFieldSet = lastFieldSet.cloneNode(true);
        const newIndex = Date.now();

        newFieldSet.querySelectorAll("input, select, button, div").forEach((input) => {
            if (input.tagName === "INPUT") input.value = "";
            if (input.name) input.name = input.name.replace(/\[\d+\]/, `[${newIndex}]`);
            if (input.id) input.id = input.id.replace(/_\d+/, `_${newIndex}`);
        });

        newFieldSet.querySelector(`.${addButtonClass}`).classList.remove("hidden");
        newFieldSet.querySelector(`.${deleteButtonClass}`).classList.add("hidden");

        container.querySelectorAll(`.${fieldClass}`).forEach((section) => {
            section.querySelector(`.${addButtonClass}`)?.classList.add("hidden");
            section.querySelector(`.${deleteButtonClass}`)?.classList.remove("hidden");
        });

        container.appendChild(newFieldSet);
    }

    deleteField(button, fieldClass) {
        const section = button.closest(`.${fieldClass}`);
        if (!section) return;

        const destroyField = section.querySelector(".hidden-destroy");
        if (destroyField) {
            destroyField.value = "1";
            section.style.display = "none";
        }
    }

    // Specific Methods for each form section
    addPhoneNumber() { this.addField("#phone_forms_container", "mobile-numbers-section", "add-mobile", "delete-mobile"); }
    deletePhoneNumber(button) { this.deleteField(button, "mobile-numbers-section"); }

    addOtherContact() { this.addField("#other_forms_container", "other-contact-section", "add-other-contact", "delete-other-contact"); }
    deleteOtherContact(button) { this.deleteField(button, "other-contact-section"); }

    addAddress() { this.addField("#address_form_container", "address-section", "add-address", "delete-address"); }
    deleteAddress(button) { this.deleteField(button, "address-section"); }

    // Validation Methods
    validateMobile(element) { this.validateField(element, "mobile", "personal_mobile_label", "personal_mobile_empty_error_", "personal_mobile_length_error_", 10); }
    validateOtherContact(element) { this.validateField(element, "others", "other_contact_label", "other_contact_empty_error_", "other_contact_length_error_", 5); }
    validateAddress(element) { this.validateField(element, "address_line_1", "address_label", "address_empty_error_", "address_length_error_", 5); }

    validateField(element, inputName, labelId, errorEmptyIdPrefix, errorLengthIdPrefix, minLength) {
        const parentDiv = element.closest(`.${inputName.includes("mobile") ? "mobile-numbers-section" : inputName.includes("others") ? "other-contact-section" : "address-section"}`);
        if (!parentDiv) return;

        const inputField = parentDiv.querySelector(`[id^='user_contacts_attributes_'][id$='_${inputName}'], [id^='user_addresses_attributes_'][id$='_${inputName}']`);
        const label = document.getElementById(labelId);
        const errorEmpty = parentDiv.querySelector(`[id^='${errorEmptyIdPrefix}']`);
        const errorLength = parentDiv.querySelector(`[id^='${errorLengthIdPrefix}']`);

        if (!inputField || inputField.value.trim() === "") {
            label.classList.add("error_label");
            errorEmpty.classList.remove("hidden");
            errorLength.classList.add("hidden");
        } else if (inputField.value.trim().length < minLength) {
            label.classList.add("error_label");
            errorEmpty.classList.add("hidden");
            errorLength.classList.remove("hidden");
        } else {
            label.classList.remove("error_label");
            errorEmpty.classList.add("hidden");
            errorLength.classList.add("hidden");
        }
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
