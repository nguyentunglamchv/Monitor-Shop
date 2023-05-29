package com.mshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mshop.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	Boolean existsByEmail(String email);
	
	User findByEmail(String email);
	
//	@Query(value = "select * from user where status = 1 and role = 0", nativeQuery = true)
	List<User> findByStatusTrueAndRoleFalse();
	
	//get admin
	@Query(value = "select * from users where status = 1 and role = 1", nativeQuery = true)
	List<User> findAllAdmin();
	//getUser
	@Query(value = "select * from users where status = 1 and role = 0", nativeQuery = true)
	List<User> findAllUser();
	
}
