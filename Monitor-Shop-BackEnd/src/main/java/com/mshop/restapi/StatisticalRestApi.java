package com.mshop.restapi;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mshop.entity.Statistical;
import com.mshop.repository.OrderRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("statistical/api")
public class StatisticalRestApi {
	
	@Autowired
	OrderRepository repo;	
	
	@GetMapping("{year}")
	public ResponseEntity<List<Statistical>> getStatisticalYear(@PathVariable("year") int year)  {
		List<Object[]> list = repo.getStatisticalMonthYear(year);
		List<Statistical> listSta = new ArrayList<>();
		List<Statistical> listReal = new ArrayList<>();
		for(int i = 0; i<list.size(); i++) {
			Statistical sta = new Statistical((int) list.get(i)[1], null, (Double) list.get(i)[0], BigInteger.valueOf(0));
			listSta.add(sta);
		}
		for(int i = 1; i < 13; i++) {
			Statistical sta = new Statistical(i, null, 0.0, BigInteger.valueOf(0));
			for(int y = 0; y < listSta.size(); y++) {
				if(listSta.get(y).getMonth() == i) {
					listReal.remove(sta);
					listReal.add(listSta.get(y));
					break;
				} else {
					listReal.remove(sta);
					listReal.add(sta);
				}
			}
		}
		return ResponseEntity.ok(listReal);
	}
	
	@GetMapping("month")
	public ResponseEntity<List<Statistical>> getStatisticalYears() {
		List<Object[]> list = repo.getStatisticalMonth();
		List<Statistical> listSta = new ArrayList<>();
		for(int i = 0; i<list.size(); i++) {
			Statistical sta = new Statistical(0, (Date) list.get(i)[2], (Double) list.get(i)[0], (BigInteger) list.get(i)[3]);
			listSta.add(sta);
		}
		return ResponseEntity.ok(listSta);
	}
	
	@GetMapping("date")
	public ResponseEntity<List<Statistical>> getStatisticalAllDate() {
		List<Object[]> list = repo.getStatisticalDate();
		List<Statistical> listSta = new ArrayList<>();
		for(int i = 0; i<list.size(); i++) {
			Statistical sta = new Statistical(0, (Date) list.get(i)[1], (Double) list.get(i)[2], (BigInteger) list.get(i)[3]);
			listSta.add(sta);
		}
		return ResponseEntity.ok(listSta);
	}
	
	@GetMapping("years")
	public ResponseEntity<List<Statistical>> getStatisticalAllYear() {
		List<Object[]> list = repo.getStatisticalYear();
		List<Statistical> listSta = new ArrayList<>();
		for(int i = 0; i<list.size(); i++) {
			Statistical sta = new Statistical(0, (Date) list.get(i)[1], (Double) list.get(i)[2], (BigInteger) list.get(i)[3]);
			listSta.add(sta);
		}
		return ResponseEntity.ok(listSta);
	}
	

	@GetMapping("year")
	public ResponseEntity<List<Integer>> getYears() {
		return ResponseEntity.ok(repo.getYears());
	}
}
