CREATEDB -h localhost -p 5432 -U postgres tradecrafts

CREATE TABLE users (user_id SERIAL PRIMARY KEY, username text NOT NULL, email text  NOT NULL, password text NOT NULL, user_role text NOT NULL, date_joined timestamp default current_timestamp, status boolean default 0);


CREATE TABLE learners (learner_id SERIAL PRIMARY KEY, user_id integer references users (user_id) on delete cascade, firstname text NOT NULL, lastname text NOT NULL, dob timestamp NOT NULL, mobile_no text NOT NULL, state text NOT NULL, gender text NOT NULL, public_id text, img_url text, last_updated timestamp default current_timestamp NOT NULL, status INTEGER default 0);
CREATE TABLE learner (learner_id SERIAL PRIMARY KEY, user_id integer references users (user_id) on delete cascade, firstname text NOT NULL, lastname text NOT NULL, dob timestamp NOT NULL, mobile_no text NOT NULL, state text NOT NULL, gender text NOT NULL, public_id text, img_url text, last_updated timestamp default current_timestamp NOT NULL, status INTEGER default 0);
alter table learners drop column country;


CREATE TABLE entreprenuers (entreprenuer_id SERIAL PRIMARY KEY, user_id integer references users (user_id) on delete cascade, firstname text, lastname text, dob timestamp, mobile_no text, state text, country text, skill text, public_id text, img_url text, last_updated timestamp default current_timestamp);
alter table entreprenuers drop column country;
alter table entreprenuers add column facebook_url text;
alter table entreprenuers add column instagram_url text;
alter table entreprenuers add column twitter_url text;


CREATE TABLE mentors (mentor_id SERIAL PRIMARY KEY, entreprenuer_id integer references entreprenuers (entreprenuer_id) on delete cascade, specialization text, years_of_expertise integer, certificate_public_id text, certificate_url text);


CREATE TABLE administrators (admin_id SERIAL PRIMARY KEY, user_id integer references users (user_id) on delete cascade, firstname text, lastname text, mobile_no text, public_id text, img_url text, date_added timestamp default current_timestamp);


CREATE TABLE skills (skill_id SERIAL PRIMARY KEY, entreprenuer_id integer references entreprenuers (entreprenuer_id) on delete cascade, name text, location text, price integer, description text, public_id text, skill_url text);
alter table skills add column Period text;
alter table skills rename column available_date TO start_date;


CREATE TABLE products (product_id SERIAL PRIMARY KEY, user_id integer references users (user_id) on delete cascade, name text, price integer, location text, description text, public_id text, skill_url text, added_on timestamp default current_timestamp);


CREATE TABLE products (product_id SERIAL PRIMARY KEY, user_id integer references users (user_id) on delete cascade, name text, price integer, description text, public_id text, product_url text);



CREATE TABLE cart (cart_id SERIAL PRIMARY KEY, skill_id integer references skills (skill_id) on delete cascade, learner_id integer references learners (learner_id) on delete cascade, entreprenuer_id integer references entreprenuers (entreprenuer_id) on delete cascade, added_on timestamp default current_timestamp);
alter table cart add column status integer default 0;


CREATE TABLE subscription_emails (email_id SERIAL PRIMARY KEY, email text, added_on timestamp default current_timestamp);


CREATE TABLE login_logs (log_id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users (user_id) ON DELETE CASCADE, username text NOT NULL, success boolean NOT NULL);


CREATE TABLE reviews (review_id SERIAL PRIMARY KEY, added_on timestamp default current_timestamp);


CREATE TABLE chat (chat_id INTEGER, sender_id INTEGER REFERENCES users (user_id) ON DELETE CASCADE, receipient_id INTEGER REFERENCES users (user_id) ON DELETE CASCADE, message text NOT NULL,time timestamp default current_timestamp);
alter table chat add column entreprenuer_id integer references entreprenuers (entreprenuer_id) on delete cascade;
alter table chat add column learner_id integer references learner (learner_id) on delete cascade;


CREATE TABLE booked_skill (booked_id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users (user_id) ON DELETE CASCADE, skill_id INTEGER REFERENCES skill (skill_id) ON DELETE CASCADE, date timestamp default current_timestamp);
insert into booked_skill (user_id,skill_id) values (43,50);


delete from login_logs where time < current_timestamp - interval '7 days';





-- git checkout -b john
-- git switch -b john
-- git add .
-- git commit -m "Write what you updated here"
-- git fetch
-- git push -u origin john












CREATE TABLE `customers`.`customers_info` (`customer_id` SERIAL  PRIMARY KEY NOT NULL , `name` VARCHAR(30) NOT NULL , 
`email` VARCHAR(30) NOT NULL , `contact` VARCHAR(11) NOT NULL , `city` VARCHAR(20) NOT NULL , 
`country` VARCHAR(20) NOT NULL , `gender` VARCHAR(7) NOT NULL , `date` TIMESTAMP(35) NOT NULL DEFAULT CURRENT_TIMESTAMP(35) , 
UNIQUE `email` (`email`(30)), UNIQUE `contact` (`contact`(11)));

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `date`) VALUES (1, 'admin', 'admin@gmail.com', 'admin', current_timestamp());

INSERT INTO `customers_info` (`customer_id`, `name`, `email`, `contact`, `city`, `country`, `gender`, `date`) VALUES (NULL, 'fatima danjuma', 'fati@gmail.com', '09076423568', 'kano', 'Nigeria', 'Female', current_timestamp());

customer_id   	name	email	contact	city	country	gender	date	
1	ifeanyi fortune	fortune@gmail.com	09087653456	Kaduna	Nigeria	Male	2024-03-02 22:37:28	
2	vincent Agwom	vincee@gmail.com	08078563421	Abuja	Nigeria	Male	2024-03-02 22:41:32	
3	victor eze	victeze@gmail.com	09078632456	Enugu	Nigeria	Male	2024-03-02 22:41:32	
4	Stella oluwakemi	stellakito@gmail.com	07065839547	Kogi	Nigeria	Female	2024-03-02 22:41:32	
5	john tighil	jan@gmail.com	09087235476	bauchi	Nigeria	Male	2024-03-02 22:46:59	
6	dorcas david sang	dorsang@gmail.com	08056332987	jos	Nigeria	female	2024-03-02 22:46:59	
7	abdul mohammad	abdulmk@gmail.com	08074653283	Katsina	Nigeria	Male	2024-03-02 22:51:40	
8	oluwatoyin kolawole	toyinkola@gmail.com	09055262836	oyo	Nigeria	male	2024-03-02 22:51:40	
9	waheed bello	waheedu@gmail.com	08076334567	lagos	Nigeria	Male	2024-03-02 22:51:40	
10	praise nze	zicostra@gmail.com	08123546788	abuja	nigeria	male	2024-03-02 22:51:40	
