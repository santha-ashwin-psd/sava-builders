# A7 – Request for Quotation: UAT Script

**Sava Builders – ERPNext Phase 1**
**Scope item:** A7. RFQ to at least 3 suppliers by email from the approved MRN.
**Pass rule:** RFQ emailed in UAT.

## Before you start

| Need | Detail |
| --- | --- |
| Company email | Outgoing email (SMTP) is set up for the company and a test email works |
| Project | One open test project, e.g. `TEST-001` |
| Suppliers | At least 4 active suppliers with valid email addresses you can open. One extra supplier with **no** email, one **disabled** supplier |
| MRN | One approved Purchase MRN with 2 or more lines, plus one MRN still in Draft, one Transfer-type MRN, one fully issued MRN |
| User | Purchase user (can create and send RFQs) |

Record the result of each step as **Pass** or **Fail**, with the document number and any remarks.

## Test 1 – Create an RFQ from an approved MRN (main flow)

| # | Step | Expected result | Result |
| --- | --- | --- | --- |
| 1.1 | Open the approved Purchase MRN and start a new RFQ from it (or open Request for Quotation, New, and pick the MRN) | Project, delivery warehouse and all pending MRN lines are filled in. Quantity = required minus already issued. Intended use is copied | |
| 1.2 | Check the RFQ number | Format `SB-RFQ-YY-####` | |
| 1.3 | Add suppliers one by one | Supplier name and email fill in from the supplier master | |
| 1.4 | Change one supplier's email on the row | The edited email is kept | |
| 1.5 | Set Respond By to 7 days ahead and add a message. Save | Saved as **Draft** | |

## Test 2 – Send to 3 suppliers (pass criterion)

| # | Step | Expected result | Result |
| --- | --- | --- | --- |
| 2.1 | With 3 suppliers added, click **Send** | Message says 3 sent, 0 failed. Status becomes **Sent** | |
| 2.2 | Open each supplier's inbox | Each supplier received **one** separate email | |
| 2.3 | Read each email | Addressed to that supplier only. Shows RFQ number, project, respond-by date, delivery warehouse, items with quantity, unit and intended use. No other supplier's name appears | |
| 2.4 | Check the supplier rows on the RFQ | Each shows Sent with date and time | |
| 2.5 | Try to change an item quantity and save | Blocked: items can't change after sending | |

## Test 3 – Checks that must block

| # | Step | Expected result | Result |
| --- | --- | --- | --- |
| 3.1 | New RFQ with only 2 suppliers, click Send | Blocked: at least 3 suppliers needed. No email sent | |
| 3.2 | Add a supplier with no email and Send | Blocked, naming the supplier. No email sent to anyone | |
| 3.3 | Add the same supplier twice and save | Blocked: supplier listed more than once | |
| 3.4 | Add the disabled supplier and save | Blocked: supplier is disabled | |
| 3.5 | Try to raise an RFQ from the Draft MRN | Blocked: MRN not approved | |
| 3.6 | Try to raise an RFQ from the Transfer MRN | Blocked: only Purchase requests | |
| 3.7 | Try to raise an RFQ from the fully issued MRN | Blocked: nothing pending | |
| 3.8 | Raise a valid RFQ and raise the quantity above the pending quantity | Blocked, showing required, issued and pending | |
| 3.9 | Set Respond By earlier than the RFQ date | Blocked | |
| 3.10 | Try to raise an RFQ on a closed project | Blocked | |

## Test 4 – Partial failure and retry

Ask the admin to make one supplier's email fail (for example a mistyped domain) before sending.

| # | Step | Expected result | Result |
| --- | --- | --- | --- |
| 4.1 | Send an RFQ with 3 suppliers where one will fail | The other two still receive their email. The failed row shows **Failed** with a short reason | |
| 4.2 | Check the RFQ status | Still **Draft**, because fewer than 3 were delivered | |
| 4.3 | Correct the failed supplier's email and click Send again | Only that supplier is emailed. Status becomes **Sent** | |
| 4.4 | Click Send again | Message says it was already sent to every supplier. Nothing is emailed | |

## Test 5 – Cancel

| # | Step | Expected result | Result |
| --- | --- | --- | --- |
| 5.1 | Cancel a Draft RFQ | Status **Cancelled** | |
| 5.2 | Cancel a Sent RFQ | Status **Cancelled** | |
| 5.3 | Try to edit or send a cancelled RFQ | Blocked | |
| 5.4 | Raise a new RFQ for the same MRN | Allowed | |

## Test 6 – Roles (links to A17)

| # | User | Action | Expected result | Result |
| --- | --- | --- | --- | --- |
| 6.1 | Purchase user | Create and send an RFQ | Allowed | |
| 6.2 | View-only user | Open an RFQ | Can read. Cannot create, edit or send | |
| 6.3 | Site user with no purchase access | Open Request for Quotation | Not available | |

## Sign-off

| | Name | Date | Signature |
| --- | --- | --- | --- |
| Tested by (Sava) | | | |
| PS Digitise | | | |

**A7 passes** when Tests 1, 2 and 3 are all Pass and every issue from Tests 4 to 6 is logged and fixed or agreed.