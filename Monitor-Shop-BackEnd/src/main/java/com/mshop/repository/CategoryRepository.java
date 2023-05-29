package com.mshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mshop.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>{
	List<Category> findByStatusTrue();
}
