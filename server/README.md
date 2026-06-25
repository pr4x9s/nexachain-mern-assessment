# Tests performed in `Postman`

# Authentication APIs

## Register - [Parent] `POST` (`/users/register`)

- Request Body:
```json
{
    "fullName": "Parent User",
    "email": "parent@test.com",
    "mobileNumber": "+919876543210",
    "password": "123456",
    "referralCodeUsed": ""
}
```

- Response Body:
```json
{
    "statusCode": 201,
    "data": {
        "user": {
            "_id": "6a3d36214458c8b8149e7ae7",
            "fullName": "Parent User",
            "email": "parent@test.com",
            "mobileNumber": "+919876543210",
            "referralCode": "92DBBA6D",
            "referredBy": null,
            "walletBalance": 0,
            "totalRoiEarned": 0,
            "totalLevelIncomeEarned": 0,
            "accountStatus": "Active",
            "createdAt": "2026-06-25T14:07:29.693Z",
            "updatedAt": "2026-06-25T14:07:29.693Z",
            "__v": 0
        }
    },
    "message": "User registered successfully",
    "success": true
}
```
---

## Register - [Child] `POST` (`/users/register`)

- Request Body:
```json
{
    "fullName": "Child User",
    "email": "child@test.com",
    "mobileNumber": "+919876543211",
    "password": "123456",
    "referralCodeUsed": "92DBBA6D"
}
```

- Response Body:
```json
{
    "statusCode": 201,
    "data": {
        "user": {
            "_id": "6a3d36c84458c8b8149e7ae8",
            "fullName": "Child User",
            "email": "child@test.com",
            "mobileNumber": "+919876543211",
            "referralCode": "9F90DD83",
            "referredBy": "6a3d36214458c8b8149e7ae7",
            "walletBalance": 0,
            "totalRoiEarned": 0,
            "totalLevelIncomeEarned": 0,
            "accountStatus": "Active",
            "createdAt": "2026-06-25T14:10:16.056Z",
            "updatedAt": "2026-06-25T14:10:16.056Z",
            "__v": 0
        }
    },
    "message": "User registered successfully",
    "success": true
}
```
---
## Register - [GrandChild] `POST` (`/users/register`)

- Request Body:
```json
{
    "fullName": "Grand Child User",
    "email": "grandchild@test.com",
    "mobileNumber": "+919876543212",
    "password": "123456",
    "referralCodeUsed": "9F90DD83"
}
```

- Response Body:
```json
{
    "statusCode": 201,
    "data": {
        "user": {
            "_id": "6a3d37814458c8b8149e7ae9",
            "fullName": "Grand Child User",
            "email": "grandchild@test.com",
            "mobileNumber": "+919876543212",
            "referralCode": "47C90F17",
            "referredBy": "6a3d36c84458c8b8149e7ae8",
            "walletBalance": 0,
            "totalRoiEarned": 0,
            "totalLevelIncomeEarned": 0,
            "accountStatus": "Active",
            "createdAt": "2026-06-25T14:13:21.693Z",
            "updatedAt": "2026-06-25T14:13:21.693Z",
            "__v": 0
        }
    },
    "message": "User registered successfully",
    "success": true
}
```
---
## Register - [GreatGrandChild] `POST` (`/users/register`)

- Request Body:
```json
{
    "fullName": "Great Grand Child User",
    "email": "greatgrandchild@test.com",
    "mobileNumber": "+919876543213",
    "password": "123456",
    "referralCodeUsed": "47C90F17"
}
```

- Response Body:
```json
{
    "statusCode": 201,
    "data": {
        "user": {
            "_id": "6a3d37d04458c8b8149e7aea",
            "fullName": "Great Grand Child User",
            "email": "greatgrandchild@test.com",
            "mobileNumber": "+919876543213",
            "referralCode": "0F1CA5BB",
            "referredBy": "6a3d37814458c8b8149e7ae9",
            "walletBalance": 0,
            "totalRoiEarned": 0,
            "totalLevelIncomeEarned": 0,
            "accountStatus": "Active",
            "createdAt": "2026-06-25T14:14:40.926Z",
            "updatedAt": "2026-06-25T14:14:40.926Z",
            "__v": 0
        }
    },
    "message": "User registered successfully",
    "success": true
}
```
---
## Register - [Admin] `POST` (`/users/register`)

- Request Body:
```json
{
    "fullName": "Admin User",
    "email": "admin@test.com",
    "mobileNumber": "+919876543214",
    "password": "123456",
    "referralCodeUsed": ""
}
```

- Response Body:
```json
{
    "statusCode": 201,
    "data": {
        "user": {
            "_id": "6a3d39044458c8b8149e7aeb",
            "fullName": "Admin User",
            "email": "admin@test.com",
            "mobileNumber": "+919876543214",
            "referralCode": "BD6A697A",
            "referredBy": null,
            "walletBalance": 0,
            "totalRoiEarned": 0,
            "totalLevelIncomeEarned": 0,
            "accountStatus": "Active",
            "createdAt": "2026-06-25T14:19:48.972Z",
            "updatedAt": "2026-06-25T14:19:48.972Z",
            "__v": 0
        }
    },
    "message": "User registered successfully",
    "success": true
}
```
---
---

# Investment APIs

## Create Investment - [Parent] `POST` (`/investments/create-investment`)

- Request Body:

```json
{
    "investmentAmount": 10000,
    "planDetails": "This is plan details for parent user"
}
```
- Response Body:
```json
{
    "statusCode": 201,
    "data": {
        "userReference": "6a3d36214458c8b8149e7ae7",
        "investmentAmount": 10000,
        "planDetails": "This is plan details for parent user",
        "startDate": "2026-06-25T14:22:50.771Z",
        "endDate": "2026-07-25T14:22:50.771Z",
        "dailyRoiPercentage": 1,
        "investmentStatus": "Active",
        "_id": "6a3d39ba4458c8b8149e7aec",
        "createdAt": "2026-06-25T14:22:50.771Z",
        "updatedAt": "2026-06-25T14:22:50.771Z",
        "__v": 0
    },
    "message": "Investment is active & processing succesfully",
    "success": true
}
```
---

## Create Investment - [Child] `POST` (`/investments/create-investment`))

- Request Body:
```json
{
    "investmentAmount": 20000,
    "planDetails": "This is plan details for child user"
}
```

- Response Body:

```json
{
    "statusCode": 201,
    "data": {
        "userReference": "6a3d36c84458c8b8149e7ae8",
        "investmentAmount": 20000,
        "planDetails": "This is plan details for child user",
        "startDate": "2026-06-25T14:23:49.243Z",
        "endDate": "2026-07-25T14:23:49.243Z",
        "dailyRoiPercentage": 1,
        "investmentStatus": "Active",
        "_id": "6a3d39f54458c8b8149e7aed",
        "createdAt": "2026-06-25T14:23:49.243Z",
        "updatedAt": "2026-06-25T14:23:49.243Z",
        "__v": 0
    },
    "message": "Investment is active & processing succesfully",
    "success": true
}
```
---

## Create Investment - [GrandChild] `POST` (`/investments/create-investment`)

- Request Body:
```json
{
    "investmentAmount": 30000,
    "planDetails": "This is plan details for grand-child user"
}
```

- Response Body:

```json
{
    "statusCode": 201,
    "data": {
        "userReference": "6a3d37814458c8b8149e7ae9",
        "investmentAmount": 30000,
        "planDetails": "This is plan details for grand-child user",
        "startDate": "2026-06-25T14:24:49.596Z",
        "endDate": "2026-07-25T14:24:49.596Z",
        "dailyRoiPercentage": 1,
        "investmentStatus": "Active",
        "_id": "6a3d3a314458c8b8149e7aee",
        "createdAt": "2026-06-25T14:24:49.597Z",
        "updatedAt": "2026-06-25T14:24:49.597Z",
        "__v": 0
    },
    "message": "Investment is active & processing succesfully",
    "success": true
}
```
---

## Create Investment - [GreatGrandChild] `POST` (`/investments/create-investment`)

- Request Body:
```json
{
    "investmentAmount": 40000,
    "planDetails": "This is plan details for great-grand-child user"
}
```

- Response Body:

```json
{
    "statusCode": 201,
    "data": {
        "userReference": "6a3d37d04458c8b8149e7aea",
        "investmentAmount": 40000,
        "planDetails": "This is plan details for great-grand-child user",
        "startDate": "2026-06-25T14:27:26.335Z",
        "endDate": "2026-07-25T14:27:26.335Z",
        "dailyRoiPercentage": 1,
        "investmentStatus": "Active",
        "_id": "6a3d3ace4458c8b8149e7af0",
        "createdAt": "2026-06-25T14:27:26.336Z",
        "updatedAt": "2026-06-25T14:27:26.336Z",
        "__v": 0
    },
    "message": "Investment is active & processing succesfully",
    "success": true
}
```
---

## Get Investments - `GET` (`/investments/get-my-investments`)

- Request Params:
```bash
/investments/get-my-investments?investmentStatus=Active
```

- Response Body [**Parent**]:

```json
{
    "statusCode": 200,
    "data": {
        "investments": [
            {
                "_id": "6a3d39ba4458c8b8149e7aec",
                "userReference": "6a3d36214458c8b8149e7ae7",
                "investmentAmount": 10000,
                "planDetails": "This is plan details for parent user",
                "startDate": "2026-06-25T14:22:50.771Z",
                "endDate": "2026-07-25T14:22:50.771Z",
                "dailyRoiPercentage": 1,
                "investmentStatus": "Active",
                "createdAt": "2026-06-25T14:22:50.771Z",
                "updatedAt": "2026-06-25T14:22:50.771Z",
                "__v": 0
            }
        ],
        "count": 1
    },
    "message": "User investments retrieved successfully",
    "success": true
}
```

- Response Body [**Child**]:

```json
{
    "statusCode": 200,
    "data": {
        "investments": [
            {
                "_id": "6a3d39f54458c8b8149e7aed",
                "userReference": "6a3d36c84458c8b8149e7ae8",
                "investmentAmount": 20000,
                "planDetails": "This is plan details for child user",
                "startDate": "2026-06-25T14:23:49.243Z",
                "endDate": "2026-07-25T14:23:49.243Z",
                "dailyRoiPercentage": 1,
                "investmentStatus": "Active",
                "createdAt": "2026-06-25T14:23:49.243Z",
                "updatedAt": "2026-06-25T14:23:49.243Z",
                "__v": 0
            }
        ],
        "count": 1
    },
    "message": "User investments retrieved successfully",
    "success": true
}
```

- Response Body [**GrandChild**]:

```json
{
    "statusCode": 200,
    "data": {
        "investments": [
            {
                "_id": "6a3d3a314458c8b8149e7aee",
                "userReference": "6a3d37814458c8b8149e7ae9",
                "investmentAmount": 30000,
                "planDetails": "This is plan details for grand-child user",
                "startDate": "2026-06-25T14:24:49.596Z",
                "endDate": "2026-07-25T14:24:49.596Z",
                "dailyRoiPercentage": 1,
                "investmentStatus": "Active",
                "createdAt": "2026-06-25T14:24:49.597Z",
                "updatedAt": "2026-06-25T14:24:49.597Z",
                "__v": 0
            }
        ],
        "count": 1
    },
    "message": "User investments retrieved successfully",
    "success": true
}
```

- Response Body [**GreatGrandChild**]:

```json
{
    "statusCode": 200,
    "data": {
        "investments": [
            {
                "_id": "6a3d3ace4458c8b8149e7af0",
                "userReference": "6a3d37d04458c8b8149e7aea",
                "investmentAmount": 40000,
                "planDetails": "This is plan details for great-grand-child user",
                "startDate": "2026-06-25T14:27:26.335Z",
                "endDate": "2026-07-25T14:27:26.335Z",
                "dailyRoiPercentage": 1,
                "investmentStatus": "Active",
                "createdAt": "2026-06-25T14:27:26.336Z",
                "updatedAt": "2026-06-25T14:27:26.336Z",
                "__v": 0
            }
        ],
        "count": 1
    },
    "message": "User investments retrieved successfully",
    "success": true
}
```
---
---

# Admin API (needs to login with admin@test.com)

## Trigger Payout -  `POST` (`/admin/payout/trigger`) (Only for admin-level testing to check whether CRON succeeds or fails)

- Request:
```bash
/admin/payout/trigger
```
- Response Body:
```json
{
    "statusCode": 200,
    "data": null,
    "message": "Daily ROI and Level Income calculated and distributed successfully.",
    "success": true
}
```
---
---

# Login API

## Login - [Parent] `POST` (`/users/login`)

- Request Body:
```json
{
    "email": "parent@test.com",
    "password": "123456"
}
```

- Response Body:
```json
{
    "statusCode": 200,
    "data": {
        "user": {
            "_id": "6a3d36214458c8b8149e7ae7",
            "fullName": "Parent User",
            "email": "parent@test.com",
            "mobileNumber": "+919876543210",
            "referralCode": "92DBBA6D",
            "referredBy": null,
            "walletBalance": 127,
            "totalRoiEarned": 0,
            "totalLevelIncomeEarned": 0,
            "accountStatus": "Active",
            "createdAt": "2026-06-25T14:07:29.693Z",
            "updatedAt": "2026-06-25T15:26:34.606Z",
            "__v": 0
        },
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTNkMzYyMTQ0NThjOGI4MTQ5ZTdhZTciLCJpYXQiOjE3ODI0MDExOTQsImV4cCI6MTc4MjQwMjA5NH0.aNHQky60cFDDryc3EY_7fVoBgGmQBWPsewMN8vWxemc",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTNkMzYyMTQ0NThjOGI4MTQ5ZTdhZTciLCJpYXQiOjE3ODI0MDExOTQsImV4cCI6MTc4MzAwNTk5NH0._IxxZFkgEXnDhUJ6k68445XjrE4GtvlUOAGtkWF9-CA"
    },
    "message": "User logged in successfully",
    "success": true
}
```
---

## Login - [Child] `POST` (`/users/login`)

- Request Body:
```json
{
    "email": "child@test.com",
    "password": "123456"
}
```

- Response Body:
```json
{
    "statusCode": 200,
    "data": {
        "user": {
            "_id": "6a3d36c84458c8b8149e7ae8",
            "fullName": "Child User",
            "email": "child@test.com",
            "mobileNumber": "+919876543211",
            "referralCode": "9F90DD83",
            "referredBy": "6a3d36214458c8b8149e7ae7",
            "walletBalance": 227,
            "totalRoiEarned": 0,
            "totalLevelIncomeEarned": 0,
            "accountStatus": "Active",
            "createdAt": "2026-06-25T14:10:16.056Z",
            "updatedAt": "2026-06-25T15:28:26.355Z",
            "__v": 0
        },
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTNkMzZjODQ0NThjOGI4MTQ5ZTdhZTgiLCJpYXQiOjE3ODI0MDEzMDYsImV4cCI6MTc4MjQwMjIwNn0.AlvfkqzmlxjBdXDUb8PcoJ9WC2FpZBss6nfbgA-q_2s",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTNkMzZjODQ0NThjOGI4MTQ5ZTdhZTgiLCJpYXQiOjE3ODI0MDEzMDYsImV4cCI6MTc4MzAwNjEwNn0.FuqF5dc2gIURg8x3508jbq9v-H_oJjI22qdLQCmJPz0"
    },
    "message": "User logged in successfully",
    "success": true
}
```
---

## Login - [GrandChild] `POST` (`/users/login`)

- Request Body:
```json
{
    "email": "grandchild@test.com",
    "password": "123456"
}
```

- Response Body:
```json
{
    "statusCode": 200,
    "data": {
        "user": {
            "_id": "6a3d37814458c8b8149e7ae9",
            "fullName": "Grand Child User",
            "email": "grandchild@test.com",
            "mobileNumber": "+919876543212",
            "referralCode": "47C90F17",
            "referredBy": "6a3d36c84458c8b8149e7ae8",
            "walletBalance": 320,
            "totalRoiEarned": 0,
            "totalLevelIncomeEarned": 0,
            "accountStatus": "Active",
            "createdAt": "2026-06-25T14:13:21.693Z",
            "updatedAt": "2026-06-25T15:29:36.669Z",
            "__v": 0
        },
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTNkMzc4MTQ0NThjOGI4MTQ5ZTdhZTkiLCJpYXQiOjE3ODI0MDEzNzYsImV4cCI6MTc4MjQwMjI3Nn0.76hwVHLEgMuIx9YMl-Sp3A0RJsMMNPM5Lgt55u97U0k",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTNkMzc4MTQ0NThjOGI4MTQ5ZTdhZTkiLCJpYXQiOjE3ODI0MDEzNzYsImV4cCI6MTc4MzAwNjE3Nn0.t0z5jb9tlc7nRpuKmdkkrilQ7CfKEqae46yehr2ao84"
    },
    "message": "User logged in successfully",
    "success": true
}
```
---

## Login - [GreatGrandChild] `POST` (`/users/login`)

- Request Body:
```json
{
    "email": "greatgrandchild@test.com",
    "password": "123456"
}
```

- Response Body:
```json
{
    "statusCode": 200,
    "data": {
        "user": {
            "_id": "6a3d37d04458c8b8149e7aea",
            "fullName": "Great Grand Child User",
            "email": "greatgrandchild@test.com",
            "mobileNumber": "+919876543213",
            "referralCode": "0F1CA5BB",
            "referredBy": "6a3d37814458c8b8149e7ae9",
            "walletBalance": 400,
            "totalRoiEarned": 0,
            "totalLevelIncomeEarned": 0,
            "accountStatus": "Active",
            "createdAt": "2026-06-25T14:14:40.926Z",
            "updatedAt": "2026-06-25T15:30:21.643Z",
            "__v": 0
        },
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTNkMzdkMDQ0NThjOGI4MTQ5ZTdhZWEiLCJpYXQiOjE3ODI0MDE0MjEsImV4cCI6MTc4MjQwMjMyMX0.ThHMy1oJChcSE__esAZe1hLAipmoqGvxjIvK9bB-MsA",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTNkMzdkMDQ0NThjOGI4MTQ5ZTdhZWEiLCJpYXQiOjE3ODI0MDE0MjEsImV4cCI6MTc4MzAwNjIyMX0.rAaQCf8pehD4eTxEsA6xZRPQW9BICtInhlTx_JwdAug"
    },
    "message": "User logged in successfully",
    "success": true
}
```
---

## Login - [Admin] `POST` (`/users/login`)

- Request Body:
```json
{
    "email": "admin@test.com",
    "password": "123456"
}
```

- Response Body:
```json
{
    "statusCode": 200,
    "data": {
        "user": {
            "_id": "6a3d39044458c8b8149e7aeb",
            "fullName": "Admin User",
            "email": "admin@test.com",
            "mobileNumber": "+919876543214",
            "referralCode": "BD6A697A",
            "referredBy": null,
            "walletBalance": 0,
            "totalRoiEarned": 0,
            "totalLevelIncomeEarned": 0,
            "accountStatus": "Active",
            "createdAt": "2026-06-25T14:19:48.972Z",
            "updatedAt": "2026-06-25T15:31:17.434Z",
            "__v": 0
        },
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTNkMzkwNDQ0NThjOGI4MTQ5ZTdhZWIiLCJpYXQiOjE3ODI0MDE0NzcsImV4cCI6MTc4MjQwMjM3N30.ZorGOi847q4gIG3jYaF-OT3JsbOg3pmDgHBpQxO7WtQ",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTNkMzkwNDQ0NThjOGI4MTQ5ZTdhZWIiLCJpYXQiOjE3ODI0MDE0NzcsImV4cCI6MTc4MzAwNjI3N30.k6vPXGG4-NFxjq7weaP5DhZ-RE6XIXF-GZfeva817p0"
    },
    "message": "User logged in successfully",
    "success": true
}
```
---
---

# Dashboard API

## Get Stats - `GET` (`/dashboard/stats`)

- Response Body [**Parent**]:
```json
{
    "statusCode": 200,
    "data": {
        "totalInvestments": 10000,
        "totalRoiEarned": 100,
        "totalLevelIncomeEarned": 27,
        "walletBalance": 127
    },
    "message": "Dashboard overview statistics compiled successfully.",
    "success": true
}
```

- Response Body [**Child**]:
```json
{
    "statusCode": 200,
    "data": {
        "totalInvestments": 20000,
        "totalRoiEarned": 200,
        "totalLevelIncomeEarned": 27,
        "walletBalance": 227
    },
    "message": "Dashboard overview statistics compiled successfully.",
    "success": true
}
```

- Response Body [**GrandChild**]:
```json
{
    "statusCode": 200,
    "data": {
        "totalInvestments": 30000,
        "totalRoiEarned": 300,
        "totalLevelIncomeEarned": 20,
        "walletBalance": 320
    },
    "message": "Dashboard overview statistics compiled successfully.",
    "success": true
}
```

- Response Body [**GreatGrandChild**]:
```json
{
    "statusCode": 200,
    "data": {
        "totalInvestments": 40000,
        "totalRoiEarned": 400,
        "totalLevelIncomeEarned": 0,
        "walletBalance": 400
    },
    "message": "Dashboard overview statistics compiled successfully.",
    "success": true
}
```
---
---

# Referral APIS

## Get Direct Referrals - `GET` (`/referrals/direct-refs`)

- Request:
```bash
/referrals/direct-refs
```

- Response Body (Logged in as **Parent**):
```json
{
    "statusCode": 200,
    "data": [
        {
            "_id": "6a3d36c84458c8b8149e7ae8",
            "fullName": "Child User",
            "email": "child@test.com",
            "mobileNumber": "+919876543211",
            "walletBalance": 227,
            "accountStatus": "Active",
            "createdAt": "2026-06-25T14:10:16.056Z"
        }
    ],
    "message": "Direct referrals retrieved successfully",
    "success": true
}
```

- Response Body (Logged in as **Child**):
```json
{
    "statusCode": 200,
    "data": [
        {
            "_id": "6a3d37814458c8b8149e7ae9",
            "fullName": "Grand Child User",
            "email": "grandchild@test.com",
            "mobileNumber": "+919876543212",
            "walletBalance": 320,
            "accountStatus": "Active",
            "createdAt": "2026-06-25T14:13:21.693Z"
        }
    ],
    "message": "Direct referrals retrieved successfully",
    "success": true
}
```

- Response Body (Logged in as **GrandChild**):
```json
{
    "statusCode": 200,
    "data": [
        {
            "_id": "6a3d37d04458c8b8149e7aea",
            "fullName": "Great Grand Child User",
            "email": "greatgrandchild@test.com",
            "mobileNumber": "+919876543213",
            "walletBalance": 400,
            "accountStatus": "Active",
            "createdAt": "2026-06-25T14:14:40.926Z"
        }
    ],
    "message": "Direct referrals retrieved successfully",
    "success": true
}
```

- Response Body (Logged in as **GreatGrandChild**):
```json
{
    "statusCode": 200,
    "data": [],
    "message": "Direct referrals retrieved successfully",
    "success": true
}
```

## Get Complete Referral Tree - `GET` (`/referrals/comp-ref-tree`)

- Request:
```bash
/referrals/comp-ref-tree
```

- Response Body (Logged in as **Parent**):
```json
{
    "statusCode": 200,
    "data": [
        {
            "_id": "6a3d36c84458c8b8149e7ae8",
            "fullName": "Child User",
            "email": "child@test.com",
            "walletBalance": 227,
            "createdAt": "2026-06-25T14:10:16.056Z",
            "children": [
                {
                    "_id": "6a3d37814458c8b8149e7ae9",
                    "fullName": "Grand Child User",
                    "email": "grandchild@test.com",
                    "walletBalance": 320,
                    "createdAt": "2026-06-25T14:13:21.693Z",
                    "children": [
                        {
                            "_id": "6a3d37d04458c8b8149e7aea",
                            "fullName": "Great Grand Child User",
                            "email": "greatgrandchild@test.com",
                            "walletBalance": 400,
                            "createdAt": "2026-06-25T14:14:40.926Z",
                            "children": []
                        }
                    ]
                }
            ]
        }
    ],
    "message": "Complete recursive referral tree compiled successfully",
    "success": true
}
```

- Response Body (Logged in as **Child**):
```json
{
    "statusCode": 200,
    "data": [
        {
            "_id": "6a3d37814458c8b8149e7ae9",
            "fullName": "Grand Child User",
            "email": "grandchild@test.com",
            "walletBalance": 320,
            "createdAt": "2026-06-25T14:13:21.693Z",
            "children": [
                {
                    "_id": "6a3d37d04458c8b8149e7aea",
                    "fullName": "Great Grand Child User",
                    "email": "greatgrandchild@test.com",
                    "walletBalance": 400,
                    "createdAt": "2026-06-25T14:14:40.926Z",
                    "children": []
                }
            ]
        }
    ],
    "message": "Complete recursive referral tree compiled successfully",
    "success": true
}
```

- Response Body (Logged in as **GrandChild**):
```json
{
    "statusCode": 200,
    "data": [
        {
            "_id": "6a3d37d04458c8b8149e7aea",
            "fullName": "Great Grand Child User",
            "email": "greatgrandchild@test.com",
            "walletBalance": 400,
            "createdAt": "2026-06-25T14:14:40.926Z",
            "children": []
        }
    ],
    "message": "Complete recursive referral tree compiled successfully",
    "success": true
}
```

- Response Body (Logged in as **GreatGrandChild**):
```json
{
    "statusCode": 200,
    "data": [],
    "message": "Complete recursive referral tree compiled successfully",
    "success": true
}
```