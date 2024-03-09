---
{"dg-publish":true,"permalink":"/data/airbyte/__/airbyte-local-config/"}
---


### 계정


- airbyte/password
- meta database
    - docker compose (로컬)
        - docker/`None`
        - `psql -U docker -w`
        - database: `airbyte`
    - helm chart
        - airbyte/`None`
        - `psql -U airbyte -w`
        - database: `db-airbyte`