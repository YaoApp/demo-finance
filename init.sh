#!/bin/bash
yao migrate && yao run scripts.fake.User && yao run scripts.fake.Department && /usr/local/bin/yao start
#yao migrate -n quality && yao migrate -n member && yao migrate -n plan && yao migrate -n bid && yao migrate -n contract && yao migrate -n finance_file
#yao migrate -n finance_system.account && yao migrate -n finance_system.finance_alarm && yao migrate -n finance_system.debt && yao migrate -n finance_system.salary && yao migrate -n finance_system.fund_turnover && yao migrate -n finance_system.tax && yao migrate -n finance_system.evaluate