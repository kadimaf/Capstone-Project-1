package com.cacodev.shalom.config.database;

import com.zaxxer.hikari.HikariDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource;

@Profile({"local", "dev"})
@Configuration(proxyBeanMethods = false)
public class DatabaseConfig {

    private final Logger logger = LoggerFactory.getLogger(getClass().getName());

    @Value("${spring.datasource.username}")
    private String user;

    @Value("${spring.datasource.password}")
    private String password;

    @Value("${spring.datasource.url}")
    private String url;

    @Value("${spring.datasource.dbName}")
    private String dbName;

    @Bean
    public DataSource dataSource() {
        logger.info(
                String.format("Database Config: User-%s Password-%s, URL-%s DatabaseName-%s",
                        user, "******", url, dbName));

        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setUsername(user);
        dataSource.setPassword(password);
        dataSource.setJdbcUrl(url);
        dataSource.addDataSourceProperty("databaseName", dbName);
        dataSource.setMaximumPoolSize(10);
        dataSource.setPoolName("CacodevConnectionPool");
        dataSource.addDataSourceProperty("applicationName", "CACODEV-SHALOM");
//        dataSource.setConnectionTestQuery("SELECT 1");

        return dataSource;
    }

    @Bean
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        JdbcTemplate jdbcTemplate = new JdbcTemplate();
        jdbcTemplate.setDataSource(dataSource);

        return jdbcTemplate;
    }
}