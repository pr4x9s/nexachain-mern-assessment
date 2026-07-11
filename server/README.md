# Tests performed in `Postman`

# Authentication APIs

## Register - [Parent] `POST` (`/users/register`)

- Request Body:
```json
{
    "fullName": "Parent User",
    "email": "parent@test.com",
    "mobileNumber": "+919876543210",
    "password": "Admin@123",
    "confirmPassword": "Admin@123",
    "referralCodeUsed": ""
}
```

- Response Body:
```json
{
    "statusCode": 201,
    "data": {
        "user": {
            "_id": "6a525c89b9d0296310067b40",
            "fullName": "Parent User",
            "email": "parent@test.com",
            "mobileNumber": "+919876543210",
            "referralCode": "2B67A733",
            "referredBy": null,
            "walletBalance": 0,
            "totalRoiEarned": 0,
            "totalLevelIncomeEarned": 0,
            "accountStatus": "Active",
            "createdAt": "2026-07-11T15:08:57.069Z",
            "updatedAt": "2026-07-11T15:08:57.069Z",
            "__v": 0
        }
    },
    "message": "User registered successfully",
    "success": true
}
```
---

## Login - [Parent] `POST` (`/users/login`)

- Request Body:
```json
{
    "email": "parent@test.com",
    "password": "Admin@123"
}
```

- Response Body:
```json
{
    "statusCode": 200,
    "data": {
        "user": {
            "_id": "6a525c89b9d0296310067b40",
            "fullName": "Parent User",
            "email": "parent@test.com",
            "mobileNumber": "+919876543210",
            "referralCode": "2B67A733",
            "referredBy": null,
            "walletBalance": 0,
            "totalRoiEarned": 0,
            "totalLevelIncomeEarned": 0,
            "accountStatus": "Active",
            "createdAt": "2026-07-11T15:08:57.069Z",
            "updatedAt": "2026-07-11T15:18:04.617Z",
            "__v": 0
        },
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTUyNWM4OWI5ZDAyOTYzMTAwNjdiNDAiLCJpYXQiOjE3ODM3ODMwODQsImV4cCI6MTc4Mzc4Mzk4NH0.oxTdO5k9rMaNyJ0ZHOjn4la092iJt3J00EIifhlamAQ",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTUyNWM4OWI5ZDAyOTYzMTAwNjdiNDAiLCJpYXQiOjE3ODM3ODMwODQsImV4cCI6MTc4NDM4Nzg4NH0.AC60bwe8L7AQQcWuim9RYBBWL7EyvX4O4B2XB0HqBlY"
    },
    "message": "User logged in successfully",
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
    "password": "Admin@123",
    "confirmPassword": "Admin@123",
    "referralCodeUsed": "2B67A733"
}
```

- Response Body:
```json
{
    "statusCode": 201,
    "data": {
        "user": {
            "_id": "6a525d07b9d0296310067b41",
            "fullName": "Child User",
            "email": "child@test.com",
            "mobileNumber": "+919876543211",
            "referralCode": "727C9766",
            "referredBy": "6a525c89b9d0296310067b40",
            "walletBalance": 0,
            "totalRoiEarned": 0,
            "totalLevelIncomeEarned": 0,
            "accountStatus": "Active",
            "createdAt": "2026-07-11T15:11:03.563Z",
            "updatedAt": "2026-07-11T15:11:03.563Z",
            "__v": 0
        }
    },
    "message": "User registered successfully",
    "success": true
}
```
---

## Login - [Child] `POST` (`/users/login`)

- Request Body:
```json
{
    "email": "child@test.com",
    "password": "Admin@123"
}
```

- Response Body:
```json
{
    "statusCode": 200,
    "data": {
        "user": {
            "_id": "6a525d07b9d0296310067b41",
            "fullName": "Child User",
            "email": "child@test.com",
            "mobileNumber": "+919876543211",
            "referralCode": "727C9766",
            "referredBy": {
                "_id": "6a525c89b9d0296310067b40",
                "fullName": "Parent User",
                "email": "parent@test.com"
            },
            "walletBalance": 0,
            "totalRoiEarned": 0,
            "totalLevelIncomeEarned": 0,
            "accountStatus": "Active",
            "createdAt": "2026-07-11T15:11:03.563Z",
            "updatedAt": "2026-07-11T15:20:24.399Z",
            "__v": 0
        },
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTUyNWQwN2I5ZDAyOTYzMTAwNjdiNDEiLCJpYXQiOjE3ODM3ODMyMjQsImV4cCI6MTc4Mzc4NDEyNH0.zmzJ_ficfxktsiak55LfagwCfsEnjPVmEfcgLVqot-U",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTUyNWQwN2I5ZDAyOTYzMTAwNjdiNDEiLCJpYXQiOjE3ODM3ODMyMjQsImV4cCI6MTc4NDM4ODAyNH0.3AhjctkO7qKTA7dLB-KTtiqstdxN8CItoFlYXiMj33g"
    },
    "message": "User logged in successfully",
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
    "password": "Admin@123",
    "confirmPassword": "Admin@123",
    "referralCodeUsed": "727C9766"
}
```

- Response Body:
```json
{
    "statusCode": 201,
    "data": {
        "user": {
            "_id": "6a525d67b9d0296310067b42",
            "fullName": "Grand Child User",
            "email": "grandchild@test.com",
            "mobileNumber": "+919876543212",
            "referralCode": "EC63CAF3",
            "referredBy": "6a525d07b9d0296310067b41",
            "walletBalance": 0,
            "totalRoiEarned": 0,
            "totalLevelIncomeEarned": 0,
            "accountStatus": "Active",
            "createdAt": "2026-07-11T15:12:39.917Z",
            "updatedAt": "2026-07-11T15:12:39.917Z",
            "__v": 0
        }
    },
    "message": "User registered successfully",
    "success": true
}
```
---
---
## Login - [GrandChild] `POST` (`/users/login`)

- Request Body:
```json
{
    "email": "grandchild@test.com",
    "password": "Admin@123"
}
```

- Response Body:
```json
{
    "statusCode": 200,
    "data": {
        "user": {
            "_id": "6a525d67b9d0296310067b42",
            "fullName": "Grand Child User",
            "email": "grandchild@test.com",
            "mobileNumber": "+919876543212",
            "referralCode": "EC63CAF3",
            "referredBy": {
                "_id": "6a525d07b9d0296310067b41",
                "fullName": "Child User",
                "email": "child@test.com"
            },
            "walletBalance": 0,
            "totalRoiEarned": 0,
            "totalLevelIncomeEarned": 0,
            "accountStatus": "Active",
            "createdAt": "2026-07-11T15:12:39.917Z",
            "updatedAt": "2026-07-11T15:21:44.393Z",
            "__v": 0
        },
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTUyNWQ2N2I5ZDAyOTYzMTAwNjdiNDIiLCJpYXQiOjE3ODM3ODMzMDQsImV4cCI6MTc4Mzc4NDIwNH0.ZnKsX20K6xgJzd8htneB048PaRsMwIA2JgAhulnYkWU",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTUyNWQ2N2I5ZDAyOTYzMTAwNjdiNDIiLCJpYXQiOjE3ODM3ODMzMDQsImV4cCI6MTc4NDM4ODEwNH0.GqXr3C_BJrMtps02Cr_0bPftXgNd1GvTJEx93vs7Bkg"
    },
    "message": "User logged in successfully",
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
    "password": "Admin@123",
    "confirmPassword": "Admin@123",
    "referralCodeUsed": "EC63CAF3"
}
```

- Response Body:
```json
{
    "statusCode": 201,
    "data": {
        "user": {
            "_id": "6a525dbdb9d0296310067b43",
            "fullName": "Great Grand Child User",
            "email": "greatgrandchild@test.com",
            "mobileNumber": "+919876543213",
            "referralCode": "922C3552",
            "referredBy": "6a525d67b9d0296310067b42",
            "walletBalance": 0,
            "totalRoiEarned": 0,
            "totalLevelIncomeEarned": 0,
            "accountStatus": "Active",
            "createdAt": "2026-07-11T15:14:05.804Z",
            "updatedAt": "2026-07-11T15:14:05.804Z",
            "__v": 0
        }
    },
    "message": "User registered successfully",
    "success": true
}
```
---
## Login - [GreatGrandChild] `POST` (`/users/login`)

- Request Body:
```json
{
    "email": "greatgrandchild@test.com",
    "password": "Admin@123"
}
```

- Response Body:
```json
{
    "statusCode": 200,
    "data": {
        "user": {
            "_id": "6a525dbdb9d0296310067b43",
            "fullName": "Great Grand Child User",
            "email": "greatgrandchild@test.com",
            "mobileNumber": "+919876543213",
            "referralCode": "922C3552",
            "referredBy": {
                "_id": "6a525d67b9d0296310067b42",
                "fullName": "Grand Child User",
                "email": "grandchild@test.com"
            },
            "walletBalance": 0,
            "totalRoiEarned": 0,
            "totalLevelIncomeEarned": 0,
            "accountStatus": "Active",
            "createdAt": "2026-07-11T15:14:05.804Z",
            "updatedAt": "2026-07-11T15:23:18.582Z",
            "__v": 0
        },
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTUyNWRiZGI5ZDAyOTYzMTAwNjdiNDMiLCJpYXQiOjE3ODM3ODMzOTgsImV4cCI6MTc4Mzc4NDI5OH0.v8SpIsgA4ArXlRGMZpR1ROzdZPZFd88SyBQx2l2X_Gk",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTUyNWRiZGI5ZDAyOTYzMTAwNjdiNDMiLCJpYXQiOjE3ODM3ODMzOTgsImV4cCI6MTc4NDM4ODE5OH0.rhhkaZbPx68QgkRGVabbMYnmuw3-0oYxZgCxs0dI7TU"
    },
    "message": "User logged in successfully",
    "success": true
}
```
---
## Register - [Admin] `POST` (`/users/register`)

- Request Body:
```json
{
    "fullName": "Admin User",
    "email": "admin1@test.com",
    "mobileNumber": "+919876543214",
    "password": "Admin@123",
    "confirmPassword": "Admin@123",
    "referralCodeUsed": ""
}
```

- Response Body:
```json
{
    "statusCode": 201,
    "data": {
        "user": {
            "_id": "6a525df4b9d0296310067b44",
            "fullName": "Admin User",
            "email": "admin1@test.com",
            "mobileNumber": "+919876543214",
            "referralCode": "047E51CD",
            "referredBy": null,
            "walletBalance": 0,
            "totalRoiEarned": 0,
            "totalLevelIncomeEarned": 0,
            "accountStatus": "Active",
            "createdAt": "2026-07-11T15:15:00.335Z",
            "updatedAt": "2026-07-11T15:15:00.335Z",
            "__v": 0
        }
    },
    "message": "User registered successfully",
    "success": true
}
```
---
## Login - [Admin] `POST` (`/users/login`)

- Request Body:
```json
{
    "email": "admin1@test.com",
    "password": "Admin@123"
}
```

- Response Body:
```json
{
    "statusCode": 200,
    "data": {
        "user": {
            "_id": "6a525df4b9d0296310067b44",
            "fullName": "Admin User",
            "email": "admin1@test.com",
            "mobileNumber": "+919876543214",
            "referralCode": "047E51CD",
            "referredBy": null,
            "walletBalance": 0,
            "totalRoiEarned": 0,
            "totalLevelIncomeEarned": 0,
            "accountStatus": "Active",
            "createdAt": "2026-07-11T15:15:00.335Z",
            "updatedAt": "2026-07-11T15:25:54.841Z",
            "__v": 0
        },
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTUyNWRmNGI5ZDAyOTYzMTAwNjdiNDQiLCJpYXQiOjE3ODM3ODM1NTQsImV4cCI6MTc4Mzc4NDQ1NH0.3KxOMSZmjFrHJJZOPiS9CsGzfNFUl9kO27jt82Mbl_w",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTUyNWRmNGI5ZDAyOTYzMTAwNjdiNDQiLCJpYXQiOjE3ODM3ODM1NTQsImV4cCI6MTc4NDM4ODM1NH0.scEgzez1Xf5G4psttw8UoV7BofncmuCRFLP-zskoN1M"
    },
    "message": "User logged in successfully",
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
        "userReference": "6a525c89b9d0296310067b40",
        "investmentAmount": 10000,
        "planDetails": "This is plan details for parent user",
        "startDate": "2026-07-11T15:26:33.670Z",
        "endDate": "2026-08-10T15:26:33.670Z",
        "dailyRoiPercentage": 1,
        "investmentStatus": "Active",
        "_id": "6a5260a9b9d0296310067b45",
        "createdAt": "2026-07-11T15:26:33.671Z",
        "updatedAt": "2026-07-11T15:26:33.671Z",
        "__v": 0
    },
    "message": "Investment is active & processing succesfully",
    "success": true
}
```
---

## Create Investment - [Child] `POST` (`/investments/create-investment`)

- Request Body:
```json
{
    "investmentAmount": 15000,
    "planDetails": "This is plan details for child user"
}
```

- Response Body:

```json
{
    "statusCode": 201,
    "data": {
        "userReference": "6a525d07b9d0296310067b41",
        "investmentAmount": 15000,
        "planDetails": "This is plan details for child user",
        "startDate": "2026-07-11T15:28:10.124Z",
        "endDate": "2026-08-10T15:28:10.124Z",
        "dailyRoiPercentage": 1,
        "investmentStatus": "Active",
        "_id": "6a52610ab9d0296310067b47",
        "createdAt": "2026-07-11T15:28:10.125Z",
        "updatedAt": "2026-07-11T15:28:10.125Z",
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
    "investmentAmount": 20000,
    "planDetails": "This is plan details for grand-child user"
}
```

- Response Body:

```json
{
    "statusCode": 201,
    "data": {
        "userReference": "6a525d67b9d0296310067b42",
        "investmentAmount": 20000,
        "planDetails": "This is plan details for grand-child user",
        "startDate": "2026-07-11T15:29:30.138Z",
        "endDate": "2026-08-10T15:29:30.138Z",
        "dailyRoiPercentage": 1,
        "investmentStatus": "Active",
        "_id": "6a52615ab9d0296310067b48",
        "createdAt": "2026-07-11T15:29:30.138Z",
        "updatedAt": "2026-07-11T15:29:30.138Z",
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
    "investmentAmount": 25000,
    "planDetails": "This is plan details for great-grand-child user"
}
```

- Response Body:

```json
{
    "statusCode": 201,
    "data": {
        "userReference": "6a525d67b9d0296310067b42",
        "investmentAmount": 25000,
        "planDetails": "This is plan details for great-grand-child user",
        "startDate": "2026-07-11T15:30:27.698Z",
        "endDate": "2026-08-10T15:30:27.698Z",
        "dailyRoiPercentage": 1,
        "investmentStatus": "Active",
        "_id": "6a526193b9d0296310067b49",
        "createdAt": "2026-07-11T15:30:27.698Z",
        "updatedAt": "2026-07-11T15:30:27.698Z",
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
                "_id": "6a5260a9b9d0296310067b45",
                "userReference": "6a525c89b9d0296310067b40",
                "investmentAmount": 10000,
                "planDetails": "This is plan details for parent user",
                "startDate": "2026-07-11T15:26:33.670Z",
                "endDate": "2026-08-10T15:26:33.670Z",
                "dailyRoiPercentage": 1,
                "investmentStatus": "Active",
                "createdAt": "2026-07-11T15:26:33.671Z",
                "updatedAt": "2026-07-11T15:26:33.671Z",
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
                "_id": "6a5260edb9d0296310067b46",
                "userReference": "6a525d07b9d0296310067b41",
                "investmentAmount": 15000,
                "planDetails": "This is plan details for child user",
                "startDate": "2026-07-11T15:27:41.414Z",
                "endDate": "2026-08-10T15:27:41.414Z",
                "dailyRoiPercentage": 1,
                "investmentStatus": "Active",
                "createdAt": "2026-07-11T15:27:41.414Z",
                "updatedAt": "2026-07-11T15:27:41.414Z",
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
                "_id": "6a526193b9d0296310067b49",
                "userReference": "6a525d67b9d0296310067b42",
                "investmentAmount": 25000,
                "planDetails": "This is plan details for great-grand-child user",
                "startDate": "2026-07-11T15:30:27.698Z",
                "endDate": "2026-08-10T15:30:27.698Z",
                "dailyRoiPercentage": 1,
                "investmentStatus": "Active",
                "createdAt": "2026-07-11T15:30:27.698Z",
                "updatedAt": "2026-07-11T15:30:27.698Z",
                "__v": 0
            },
            {
                "_id": "6a52615ab9d0296310067b48",
                "userReference": "6a525d67b9d0296310067b42",
                "investmentAmount": 20000,
                "planDetails": "This is plan details for grand-child user",
                "startDate": "2026-07-11T15:29:30.138Z",
                "endDate": "2026-08-10T15:29:30.138Z",
                "dailyRoiPercentage": 1,
                "investmentStatus": "Active",
                "createdAt": "2026-07-11T15:29:30.138Z",
                "updatedAt": "2026-07-11T15:29:30.138Z",
                "__v": 0
            }
        ],
        "count": 2
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
                "_id": "6a52630eb9d0296310067b4a",
                "userReference": "6a525dbdb9d0296310067b43",
                "investmentAmount": 10000,
                "planDetails": "This is plan details for greatgrandchild1 user",
                "startDate": "2026-07-11T15:36:46.726Z",
                "endDate": "2026-08-10T15:36:46.726Z",
                "dailyRoiPercentage": 1,
                "investmentStatus": "Active",
                "createdAt": "2026-07-11T15:36:46.727Z",
                "updatedAt": "2026-07-11T15:36:46.727Z",
                "__v": 0
            }
        ],
        "count": 1
    },
    "message": "User investments retrieved successfully",
    "success": true
}
```

## Get ROI History - `GET` (`/investments/get-roi-history`)

- Request:
```bash
/investments/get-roi-history
```

- Response Body [**Parent**]:

```json
{
    "statusCode": 200,
    "data": [
        {
            "_id": "6a526365b9d0296310067b4b",
            "userReference": "6a525c89b9d0296310067b40",
            "investmentReference": {
                "_id": "6a5260a9b9d0296310067b45",
                "investmentAmount": 10000,
                "planDetails": "This is plan details for parent user"
            },
            "roiAmount": 100,
            "status": "Processed",
            "date": "2026-07-11T15:38:13.812Z",
            "createdAt": "2026-07-11T15:38:13.812Z",
            "updatedAt": "2026-07-11T15:38:13.812Z",
            "__v": 0
        }
    ],
    "message": "Daily ROI ledger streaming logs synced successfully",
    "success": true
}
```

- Response Body [**Child**]:

```json
{
    "statusCode": 200,
    "data": [
        {
            "_id": "6a526365b9d0296310067b4c",
            "userReference": "6a525d07b9d0296310067b41",
            "investmentReference": {
                "_id": "6a5260edb9d0296310067b46",
                "investmentAmount": 15000,
                "planDetails": "This is plan details for child user"
            },
            "roiAmount": 150,
            "status": "Processed",
            "date": "2026-07-11T15:38:13.975Z",
            "createdAt": "2026-07-11T15:38:13.976Z",
            "updatedAt": "2026-07-11T15:38:13.976Z",
            "__v": 0
        }
    ],
    "message": "Daily ROI ledger streaming logs synced successfully",
    "success": true
}
```

- Response Body [**GrandChild**]:

```json
{
    "statusCode": 200,
    "data": [
        {
            "_id": "6a526366b9d0296310067b51",
            "userReference": "6a525d67b9d0296310067b42",
            "investmentReference": {
                "_id": "6a526193b9d0296310067b49",
                "investmentAmount": 25000,
                "planDetails": "This is plan details for great-grand-child user"
            },
            "roiAmount": 250,
            "status": "Processed",
            "date": "2026-07-11T15:38:14.831Z",
            "createdAt": "2026-07-11T15:38:14.832Z",
            "updatedAt": "2026-07-11T15:38:14.832Z",
            "__v": 0
        },
        {
            "_id": "6a526366b9d0296310067b4e",
            "userReference": "6a525d67b9d0296310067b42",
            "investmentReference": {
                "_id": "6a52615ab9d0296310067b48",
                "investmentAmount": 20000,
                "planDetails": "This is plan details for grand-child user"
            },
            "roiAmount": 200,
            "status": "Processed",
            "date": "2026-07-11T15:38:14.307Z",
            "createdAt": "2026-07-11T15:38:14.307Z",
            "updatedAt": "2026-07-11T15:38:14.307Z",
            "__v": 0
        }
    ],
    "message": "Daily ROI ledger streaming logs synced successfully",
    "success": true
}
```

- Response Body [**GreatGrandChild**]:

```json
{
    "statusCode": 200,
    "data": [
        {
            "_id": "6a526367b9d0296310067b54",
            "userReference": "6a525dbdb9d0296310067b43",
            "investmentReference": {
                "_id": "6a52630eb9d0296310067b4a",
                "investmentAmount": 10000,
                "planDetails": "This is plan details for greatgrandchild1 user"
            },
            "roiAmount": 100,
            "status": "Processed",
            "date": "2026-07-11T15:38:15.358Z",
            "createdAt": "2026-07-11T15:38:15.359Z",
            "updatedAt": "2026-07-11T15:38:15.359Z",
            "__v": 0
        }
    ],
    "message": "Daily ROI ledger streaming logs synced successfully",
    "success": true
}
```
---
---

# Admin API (needs to login with admin1@test.com)

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

# Dashboard API

## Get Stats - `GET` (`/dashboard/stats`)

- Response Body [**Parent**]:
```json
{
    "statusCode": 200,
    "data": {
        "totalInvestments": 10000,
        "totalRoiEarned": 100,
        "totalLevelIncomeEarned": 23,
        "walletBalance": 123
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
        "totalInvestments": 15000,
        "totalRoiEarned": 150,
        "totalLevelIncomeEarned": 25.5,
        "walletBalance": 175.5
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
        "totalInvestments": 45000,
        "totalRoiEarned": 450,
        "totalLevelIncomeEarned": 5,
        "walletBalance": 455
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
        "totalInvestments": 10000,
        "totalRoiEarned": 100,
        "totalLevelIncomeEarned": 0,
        "walletBalance": 100
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
            "_id": "6a525d07b9d0296310067b41",
            "fullName": "Child User",
            "email": "child@test.com",
            "mobileNumber": "+919876543211",
            "walletBalance": 175.5,
            "accountStatus": "Active",
            "createdAt": "2026-07-11T15:11:03.563Z"
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
            "_id": "6a525d67b9d0296310067b42",
            "fullName": "Grand Child User",
            "email": "grandchild@test.com",
            "mobileNumber": "+919876543212",
            "walletBalance": 455,
            "accountStatus": "Active",
            "createdAt": "2026-07-11T15:12:39.917Z"
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
            "_id": "6a525dbdb9d0296310067b43",
            "fullName": "Great Grand Child User",
            "email": "greatgrandchild@test.com",
            "mobileNumber": "+919876543213",
            "walletBalance": 100,
            "accountStatus": "Active",
            "createdAt": "2026-07-11T15:14:05.804Z"
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
            "_id": "6a525d07b9d0296310067b41",
            "fullName": "Child User",
            "email": "child@test.com",
            "walletBalance": 175.5,
            "createdAt": "2026-07-11T15:11:03.563Z",
            "children": [
                {
                    "_id": "6a525d67b9d0296310067b42",
                    "fullName": "Grand Child User",
                    "email": "grandchild@test.com",
                    "walletBalance": 455,
                    "createdAt": "2026-07-11T15:12:39.917Z",
                    "children": [
                        {
                            "_id": "6a525dbdb9d0296310067b43",
                            "fullName": "Great Grand Child User",
                            "email": "greatgrandchild@test.com",
                            "walletBalance": 100,
                            "createdAt": "2026-07-11T15:14:05.804Z",
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
            "_id": "6a525d67b9d0296310067b42",
            "fullName": "Grand Child User",
            "email": "grandchild@test.com",
            "walletBalance": 455,
            "createdAt": "2026-07-11T15:12:39.917Z",
            "children": [
                {
                    "_id": "6a525dbdb9d0296310067b43",
                    "fullName": "Great Grand Child User",
                    "email": "greatgrandchild@test.com",
                    "walletBalance": 100,
                    "createdAt": "2026-07-11T15:14:05.804Z",
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
            "_id": "6a525dbdb9d0296310067b43",
            "fullName": "Great Grand Child User",
            "email": "greatgrandchild@test.com",
            "walletBalance": 100,
            "createdAt": "2026-07-11T15:14:05.804Z",
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

## Get Referral Income History - `GET` (`/referrals/get-referral-income-history`)

- Request:
```bash
/referrals/get-referral-income-history
```

- Response Body (Logged in as **Parent**):
```json
{
    "statusCode": 200,
    "data": [
        {
            "_id": "6a526367b9d0296310067b57",
            "userWhoEarned": "6a525c89b9d0296310067b40",
            "userWhoGenerated": {
                "_id": "6a525dbdb9d0296310067b43",
                "fullName": "Great Grand Child User",
                "email": "greatgrandchild@test.com"
            },
            "referralLevel": 3,
            "incomeAmount": 2,
            "date": "2026-07-11T15:38:15.880Z",
            "createdAt": "2026-07-11T15:38:15.880Z",
            "updatedAt": "2026-07-11T15:38:15.880Z",
            "__v": 0
        },
        {
            "_id": "6a526367b9d0296310067b53",
            "userWhoEarned": "6a525c89b9d0296310067b40",
            "userWhoGenerated": {
                "_id": "6a525d67b9d0296310067b42",
                "fullName": "Grand Child User",
                "email": "grandchild@test.com"
            },
            "referralLevel": 2,
            "incomeAmount": 7.5,
            "date": "2026-07-11T15:38:15.178Z",
            "createdAt": "2026-07-11T15:38:15.178Z",
            "updatedAt": "2026-07-11T15:38:15.178Z",
            "__v": 0
        },
        {
            "_id": "6a526366b9d0296310067b50",
            "userWhoEarned": "6a525c89b9d0296310067b40",
            "userWhoGenerated": {
                "_id": "6a525d67b9d0296310067b42",
                "fullName": "Grand Child User",
                "email": "grandchild@test.com"
            },
            "referralLevel": 2,
            "incomeAmount": 6,
            "date": "2026-07-11T15:38:14.654Z",
            "createdAt": "2026-07-11T15:38:14.655Z",
            "updatedAt": "2026-07-11T15:38:14.655Z",
            "__v": 0
        },
        {
            "_id": "6a526366b9d0296310067b4d",
            "userWhoEarned": "6a525c89b9d0296310067b40",
            "userWhoGenerated": {
                "_id": "6a525d07b9d0296310067b41",
                "fullName": "Child User",
                "email": "child@test.com"
            },
            "referralLevel": 1,
            "incomeAmount": 7.5,
            "date": "2026-07-11T15:38:14.142Z",
            "createdAt": "2026-07-11T15:38:14.142Z",
            "updatedAt": "2026-07-11T15:38:14.142Z",
            "__v": 0
        }
    ],
    "message": "Referral level network logs synced successfully",
    "success": true
}
```

- Response Body (Logged in as **Child**):
```json
{
    "statusCode": 200,
    "data": [
        {
            "_id": "6a526367b9d0296310067b56",
            "userWhoEarned": "6a525d07b9d0296310067b41",
            "userWhoGenerated": {
                "_id": "6a525dbdb9d0296310067b43",
                "fullName": "Great Grand Child User",
                "email": "greatgrandchild@test.com"
            },
            "referralLevel": 2,
            "incomeAmount": 3,
            "date": "2026-07-11T15:38:15.709Z",
            "createdAt": "2026-07-11T15:38:15.709Z",
            "updatedAt": "2026-07-11T15:38:15.709Z",
            "__v": 0
        },
        {
            "_id": "6a526367b9d0296310067b52",
            "userWhoEarned": "6a525d07b9d0296310067b41",
            "userWhoGenerated": {
                "_id": "6a525d67b9d0296310067b42",
                "fullName": "Grand Child User",
                "email": "grandchild@test.com"
            },
            "referralLevel": 1,
            "incomeAmount": 12.5,
            "date": "2026-07-11T15:38:15.004Z",
            "createdAt": "2026-07-11T15:38:15.004Z",
            "updatedAt": "2026-07-11T15:38:15.004Z",
            "__v": 0
        },
        {
            "_id": "6a526366b9d0296310067b4f",
            "userWhoEarned": "6a525d07b9d0296310067b41",
            "userWhoGenerated": {
                "_id": "6a525d67b9d0296310067b42",
                "fullName": "Grand Child User",
                "email": "grandchild@test.com"
            },
            "referralLevel": 1,
            "incomeAmount": 10,
            "date": "2026-07-11T15:38:14.480Z",
            "createdAt": "2026-07-11T15:38:14.481Z",
            "updatedAt": "2026-07-11T15:38:14.481Z",
            "__v": 0
        }
    ],
    "message": "Referral level network logs synced successfully",
    "success": true
}
```

- Response Body (Logged in as **GrandChild**):
```json
{
    "statusCode": 200,
    "data": [
        {
            "_id": "6a526367b9d0296310067b55",
            "userWhoEarned": "6a525d67b9d0296310067b42",
            "userWhoGenerated": {
                "_id": "6a525dbdb9d0296310067b43",
                "fullName": "Great Grand Child User",
                "email": "greatgrandchild@test.com"
            },
            "referralLevel": 1,
            "incomeAmount": 5,
            "date": "2026-07-11T15:38:15.536Z",
            "createdAt": "2026-07-11T15:38:15.536Z",
            "updatedAt": "2026-07-11T15:38:15.536Z",
            "__v": 0
        }
    ],
    "message": "Referral level network logs synced successfully",
    "success": true
}
```

- Response Body (Logged in as **GreatGrandChild**):
```json
{
    "statusCode": 200,
    "data": [],
    "message": "Referral level network logs synced successfully",
    "success": true
}
```