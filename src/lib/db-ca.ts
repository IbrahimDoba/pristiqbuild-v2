/**
 * Public certificate of the PristiqBuild Postgres on the Dokploy host
 * (self-signed, valid to 2036-09-28, SAN db.pristiqbuild.com and
 * 159.69.115.44). Not a secret: it lets the app recognise that server, and
 * only the holder of the matching private key, which never leaves the
 * database volume, can present it.
 *
 * Bundled so a mangled paste in a hosting dashboard cannot take the
 * database offline. DATABASE_CA_CERT still overrides it when it parses.
 * Replace this when the server certificate is rotated.
 */
export const DOKPLOY_DB_HOSTS = ["159.69.115.44", "db.pristiqbuild.com"];

export const DOKPLOY_DB_CA = `-----BEGIN CERTIFICATE-----
MIIDQzCCAiugAwIBAgIUZEvT6OUcgKp6KPG240bydp5YE2YwDQYJKoZIhvcNAQEL
BQAwHjEcMBoGA1UEAwwTZGIucHJpc3RpcWJ1aWxkLmNvbTAeFw0yNjEwMDEyMDEy
NTBaFw0zNjA5MjgyMDEyNTBaMB4xHDAaBgNVBAMME2RiLnByaXN0aXFidWlsZC5j
b20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCwN1lBbeRLbTsEFP+s
oHDju3pllL7Q6QEXHm+AJ+G9t2lWmyO4BRmRVJn8SiTx+JS38uku39UED7sHpOiT
1xuvfwTD51n/jH1VPGv1L+YS8wG9Ldo91TUd59b2xGhaAHdjQxlfP2LCLt5SBKsg
mhuUXF7uc82pyEQlWXjMQU7kg8wVASDorqxDVqZ8B2MLciqhFZHXlYHaQ9LibpU1
KbxbubSNdrKRDJe1rDARcZpIkygZJYUHKQxSZ8Wx20PXOawIaWN88m+EBXGqVBU2
3wYYwC+Iav2hbN93+s0k8Jk8SlKnkUFH4ThhdDptchmk/TuIJu3lssXnu+97yNVZ
XD4NAgMBAAGjeTB3MB0GA1UdDgQWBBRMLQgisl5ycChTws84VIAOH66VLzAfBgNV
HSMEGDAWgBRMLQgisl5ycChTws84VIAOH66VLzAPBgNVHRMBAf8EBTADAQH/MCQG
A1UdEQQdMBuCE2RiLnByaXN0aXFidWlsZC5jb22HBJ9FcywwDQYJKoZIhvcNAQEL
BQADggEBACnK9rf+chSf/4bjagNZsoGOMz2FTFLnKGWnrHL+V8mUzfNl4XW3nqBJ
vE7rOoECkokge6/48gemvpPRTk4zleKGUrpMMqYwGSVYMtETc9nFf58wrGIbH4vL
qpGwZw6EljOL3Hm8vMMro3QslwOMxbb8mpTO7AKzMv/QShNQYHo6lkW0d1bmQhhB
iYhJQ/gHDRWVdKNCQ1Cuge94NLzqbWTYnIF959SkwFlWr5q1YtBJ/xutZRuntSYn
13Sfhfm9zEe0mqY/QhKdTg97WS2qPGpt71SBRQXY5OsH7yHgsVD/2eQ+r0MP+Efl
bWDf03w7OEHlMqnWPtMfjVwJf8pj6r8=
-----END CERTIFICATE-----`;
