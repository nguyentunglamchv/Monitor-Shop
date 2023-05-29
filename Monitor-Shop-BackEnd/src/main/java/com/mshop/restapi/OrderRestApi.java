package com.mshop.restapi;

import java.text.DecimalFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mshop.entity.Order;
import com.mshop.entity.OrderDetail;
import com.mshop.repository.OrderDetailRepository;
import com.mshop.repository.OrderRepository;
import com.mshop.repository.UserRepository;
import com.mshop.service.SendMailService;

@CrossOrigin("*")
@RestController
@RequestMapping("api/orders")
public class OrderRestApi {
	@Autowired
	OrderRepository repo;
	
	@Autowired
	OrderDetailRepository Orepo;
	
	@Autowired
	UserRepository Urepo;
	
	@Autowired
	SendMailService sendmail;
	
	@GetMapping()
	public ResponseEntity<List<Order>> getAll() {
		return ResponseEntity.ok(repo.findAllOrderDesc());
	}
	
	@GetMapping("/wait")
	public ResponseEntity<List<Order>> getAllWait() {
		return ResponseEntity.ok(repo.findAllOrderWait());
	}
	
	@GetMapping("{id}")
	public ResponseEntity<Order> getOne(@PathVariable("id") Long id) {
		if(!repo.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(repo.findById(id).get());
	}
	
	@GetMapping("/user/{id}")
	public ResponseEntity<List<Order>> getAllByUser(@PathVariable("id") Long id) {
		if(!Urepo.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(repo.findAllOrderByUserId(id));
	}
	
	
	@GetMapping("/user/wait/{id}")
	public ResponseEntity<List<Order>> getAllWaitByUser(@PathVariable("id") Long id) {
		if(!Urepo.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(repo.findAllOrderWaitByUserId(id));
	}
	
	@GetMapping("/user/confirmed/{id}")
	public ResponseEntity<List<Order>> getAllConfirmedByUser(@PathVariable("id") Long id) {
		if(!Urepo.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(repo.findAllOrderConfirmedByUserId(id));
	}
	
	@GetMapping("/user/paid/{id}")
	public ResponseEntity<List<Order>> getAllPaidByUser(@PathVariable("id") Long id) {
		if(!Urepo.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(repo.findAllOrderPaidByUserId(id));
	}
	
	@GetMapping("/user/cancel/{id}")
	public ResponseEntity<List<Order>> getAllCancelByUser(@PathVariable("id") Long id) {
		if(!Urepo.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(repo.findAllOrderCancelByUserId(id));
	}
	
	@PostMapping
	public ResponseEntity<Order> post(@RequestBody Order order) {
		if(repo.existsById(order.getId())) {
			return ResponseEntity.badRequest().build();
		}
		if(!Urepo.existsById(order.getUser().getUserId())) {
			return ResponseEntity.notFound().build();
		}
		Order o = repo.save(order);
		return ResponseEntity.ok(o);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<Order> put(@PathVariable("id") Long id, @RequestBody Order order) {
		if(!repo.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		if(id != order.getId()) {
			return ResponseEntity.badRequest().build();
		}
		Order o = repo.save(order);
		return ResponseEntity.ok(o);
	}
	
}
