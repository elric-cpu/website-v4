-- Seed test tenants + users (example)
insert into tenants (id, name) values ('tenant-1', 'Acme'), ('tenant-2', 'Beta');

insert into users (id, tenant_id, role, email)
values
  ('user-1', 'tenant-1', 'client', 'client1@example.com'),
  ('user-2', 'tenant-2', 'client', 'client2@example.com'),
  ('sub-1', 'tenant-1', 'subcontractor', 'sub1@example.com');

insert into client_documents (id, user_id, title)
values ('doc-1', 'user-1', 'Contract');
