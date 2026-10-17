frappe.ui.form.on("Books Settings", {
  refresh(frm) {
    frm.set_intro(__("Configure global defaults for PSD Books"), "blue");
  },
});
