# Role/Permission Matrix

| Role          | Allowed                               | Forbidden                    | RLS Notes                       |
| ------------- | ------------------------------------- | ---------------------------- | ------------------------------- |
| public        | marketing pages, lead funnel, contact | portals, invoices, documents | no data access                  |
| lead          | estimator/lead forms                  | portals                      | no tenant data                  |
| client        | client portal, invoices, docs         | subcontractor portal         | isolate `user_id` rows          |
| staff         | internal dashboards (future)          | subcontractor portal         | access by tenant + role         |
| subcontractor | subcontractor portal                  | client portal                | isolate `subcontractor_id` rows |
| admin         | all portals                           | none                         | audit access to all tenants     |
