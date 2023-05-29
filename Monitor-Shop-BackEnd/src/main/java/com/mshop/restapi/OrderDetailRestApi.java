package com.mshop.restapi;

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

import com.mshop.entity.OrderDetail;
import com.mshop.repository.OrderDetailRepository;
import com.mshop.repository.OrderRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("api/order-detail")
public class OrderDetailRestApi {
	@Autowired
	OrderDetailRepository repo;
	
	@Autowired
	OrderRepository Orepo;
	
	@GetMapping("{id}")
	public ResponseEntity<OrderDetail> get(@PathVariable("id") Long id) {
		if(!repo.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(repo.findById(id).get());
	}
	
	@PutMapping("{id}")
	public ResponseEntity<OrderDetail> put(@PathVariable("id") Long id, @RequestBody OrderDetail orderDetail) {
		if(!repo.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		if(id != orderDetail.getId()) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(repo.save(orderDetail));
	}
	
	@GetMapping("/order/{id}")
	public ResponseEntity<List<OrderDetail>> getOrderDetailByOrder(@PathVariable("id") Long id) {
		if(!Orepo.existsById(id)) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(repo.findOrderDetailByOrderId(id));
	}
	
	@PostMapping()
	public ResponseEntity<OrderDetail> post(@RequestBody OrderDetail orderDetail) {
		if(repo.existsById(orderDetail.getId())) {
			return ResponseEntity.badRequest().build();
		}
		return ResponseEntity.ok(repo.save(orderDetail));
	}
	
}
