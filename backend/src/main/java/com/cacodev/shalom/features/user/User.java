package com.cacodev.shalom.features.user;

import com.cacodev.shalom.common.base.BaseEntity;
import com.cacodev.shalom.common.base.Gender;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Table(name = "USERS")
@Entity
public class User extends BaseEntity {

    private String username;

    private String password;

    private String firstName;

    private String middleName;

    private String lastName;

    private Gender gender;
}