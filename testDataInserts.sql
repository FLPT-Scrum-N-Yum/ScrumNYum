-- to drop tables with FK relations
DROP TABLE (tablename)
CASCADE;

-- user data
INSERT INTO public.user(username, password)
VALUES('finley', 'finley');

INSERT INTO public.user(username, password)
VALUES('patrick', 'patrick');

INSERT INTO public.user(username, password)
VALUES('thang', 'thang');

INSERT INTO public.user(username, password)
VALUES('lucien', 'lucien');

-- workspace data
INSERT INTO public.workspacesTable (workspace_name, user_id)
VALUES('Finleys Workspace', 1);

INSERT INTO public.workspacesTable (workspace_name, user_id)
VALUES('Patrick Workspace', 2);

INSERT INTO public.workspacesTable (workspace_name, user_id)
VALUES('Thang Workspace', 3);

INSERT INTO public.workspacesTable (workspace_name, user_id)
VALUES('Finleys Workspace 2', 1);

INSERT INTO public.workspacesTable (workspace_name, user_id)
VALUES('Lucien Workspace', 4);

-- stickies data

INSERT INTO public.stickiesTable(title, description, workspace_id)
VALUES('create sql database', 'do it on postgresql', 1);

INSERT INTO public.stickiesTable(title, description, workspace_id)
VALUES('create sql database', 'do it on postgresql', 1);

INSERT INTO public.stickiesTable(title, description, workspace_id)
VALUES('create sql database', 'do it on postgresql', 1);

INSERT INTO public.stickiesTable(title, description, workspace_id)
VALUES('fix server with new db', 'do it on all routes in express', 2);

INSERT INTO public.stickiesTable(title, description, workspace_id)
VALUES('make site pretty', 'CSS styling', 3);

INSERT INTO public.stickiesTable(title, description, workspace_id)
VALUES('update react components', 'prop drill, state drill, react hooks', 4);