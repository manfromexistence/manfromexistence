---
title: Service level description for ZITADEL Cloud
sidebar_label: Service Level
custom_edit_url: null
--- 

Last updated on November 15, 2023

This annex of the [Framework Agreement](../terms-of-service) describes the service levels offered by us for our Services (ZITADEL Cloud).

## Definitions

### Monthly Uptime Percentage

Monthly Uptime Percentage means total number of minutes in a month, minus the number of minutes of Downtime suffered from all Downtime Periods in a month, divided by the total number of minutes in a month.

### Downtime Period

Downtime Period means a period of one or more consecutive minutes of Downtime. Partial minutes or intermittent Downtime for a period of less than one minute will not count towards any Downtime Period.

### Downtime

Downtime means any period of time in which Core Services are not Available within the Region of the customer’s organization. Downtime excludes any time in which ZITADEL Cloud is not Available because of

- [Announced maintenance work](/docs/support/software-release-cycles-support#maintenance)
- Emergency maintenance
- Force majeure events.

### Available

Available means that Core Services of ZITADEL Cloud respond to Customer Requests in such a way that results in a Successful Minute. The Availability of Core Services will be monitored from CAOS’ facilities from black-box monitoring jobs.

### Customer Requests

Customer Requests means a HTTP request made by a Customer or a Customers’ users to Core Services within the Customer’s organization’s region.

### Successful Minute

Successful Minute means a minute in which ZITADEL Cloud is not repeatedly returning Failed Customer Requests and includes minutes in which no Customer Requests were made.

Failed Customer Request means Customer Requests that

- Returns an server error; or
- is received by ZITADEL Cloud and results in no response where one is expected

This excludes specifically:

- Failed Customer Requests due to malformed requests, client-side application errors outside of ZITADEL Cloud’s control
- Customer Requests that do not reach ZITADEL Cloud Core Services

### Core Services

Core Services means the following ZITADEL Cloud Services and API’s:

- **Authentication API** Endpoints including the session endpoints
- **OpenID Connect 1.0 / OAuth 2.0 API** Endpoints
- **SAML 2.0** Endpoints
- **Login Service** means the graphical user interface of ZITADEL Cloud for users to Login, Self-Register, and conduct a Password Reset.
- **Identity Brokering Service** means the component of ZITADEL Cloud that handles federated authentication of users with third-party identity provider, excluding any failure or misconfiguration by the third-party

### Financial Credit

**Financial Credit** means the percent of the monthly subscription fee applicable to the month in which the guaranteed service level was not met, according to the actual achieved monthly uptime percentage, as shown in the following table

Achieved vs.  Guaranteed| 99.50% | 99.90% | 99.95%
--- | --- | --- | ---
99.5% - < 99.9% | n/a | n/a | 10%
99.0% - < 99.5% | n/a | 10% | 25%
95.0% - < 99.0% | 10% | 25% | 50%
< 95.0% | 50% | 50% | 50%

## Service Levels

### Availability Objective

1. During the term of the subscription agreement under which CAOS has agreed to provide ZITADEL Cloud to Customer, the Core Services will provide a Monthly Uptime Percentage to Customer conditional on the subscription plan as follows (the “SLO”):

Option | Monthly Uptime Percentage
--- | ---
Default | 99.50%
Extended SLA | 99.95%

1. If CAOS Ltd. does not meet the guaranteed service level, Customer might be eligible to receive Financial Credit as described in this document. Financial Credit shall be the sole and exclusive remedy for breach of this SLA.
2. The Customer must request Financial Credit and must notify CAOS Support in writing within 30 days of becoming eligible for Financial Credit and must prove Failed Customer Requests during Downtime Periods. Financial Credit will be made in the form of a monetary credit applied to the next possible subscription invoice of ZITADEL Cloud,  may only be used to book services in the future, and will in no case be paid as a cash equivalent. No further guarantees are provided.
3. The Service Level commitments apply only to organizations with a subscription plan where a Service Level is applicable and does not include any other organizations of the same customer. The Customer is not entitled to any Financial Credit, if it is in breach of the Agreement at the time of the occurrence of the event giving rise to the credit.
