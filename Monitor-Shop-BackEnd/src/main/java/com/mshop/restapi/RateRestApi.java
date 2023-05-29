package com.mshop.restapi;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mshop.entity.Rate;
import com.mshop.repository.RateRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("api/rates")
public class RateRestApi {
	@Autowired
	RateRepository repo;
	
	@GetMapping()
	public ResponseEntity<List<Rate>> getAll()  {
		return ResponseEntity.ok(repo.findAll());
	}
	
	@GetMapping("{id}")
	public ResponseEntity<Rate> getOne(@PathVariable("id") Long id) {
		if(!repo.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(repo.findById(id).get());
	}
	
	@GetMapping("product/{id}")
	public ResponseEntity<List<Rate>> getByProduct(@PathVariable("id") Long id) {
		return ResponseEntity.ok(repo.findByProduct(id));
	}
	
	@GetMapping("product-avg/{id}")
	public ResponseEntity<Double> getAvgProduct(@PathVariable("id") Long id) {
		Double rate = repo.getAvgByProduct(id);
		if(rate==null) {
			rate = 0.0;
			return ResponseEntity.ok(rate);
		}
		return ResponseEntity.ok(rate);
	}
	
	@PostMapping()
	public ResponseEntity<Rate> post(@RequestBody Rate rate) {
		return ResponseEntity.ok(repo.save(rate));
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<Void> deleteById(@PathVariable("id") Long id) {
		if(!repo.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		repo.deleteById(id);
		return ResponseEntity.ok().build();
	}
}
