// Copyright (c) 2024, Frappe Technologies Pvt. Ltd. and contributors
// For license information, please see license.txt

frappe.query_reports["TDS and TCS Breakdown"] = {
	filters: [
		{
			fieldname: "company",
			label: __("Company"),
			fieldtype: "Link",
			options: "Company",
			default: frappe.defaults.get_default("company"),
		},
		{
			fieldname: "voucher_type",
			label: __("Voucher Type"),
			fieldtype: "Select",
			options: ["Sales Invoice", "Purchase Invoice", "Journal Entry"],
			reqd: 1,
			default: "Sales Invoice",
		},
		{
			fieldname: "voucher_no",
			label: __("Voucher No"),
			fieldtype: "Dynamic Link",
			get_options: function () {
				var voucher_type = frappe.query_report.get_filter_value("voucher_type");
				if (!voucher_type) {
					frappe.throw(__("Please select Voucher Type first"));
				}
				return voucher_type;
			},
			get_query: function () {
				var company = frappe.query_report.get_filter_value("company");
				return {
					filters: {
						company: company,
					},
				};
			},
		},
	],
};
