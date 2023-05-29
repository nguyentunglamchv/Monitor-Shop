package com.mshop.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mshop.entity.Order;
//import com.mshop.entity.Statistical;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

	@Query(value = "select * from orders order by order_date desc", nativeQuery = true)
	List<Order> findAllOrderDesc();

	@Query(value = "select * from orders where user_id = ? order by order_date desc", nativeQuery = true)
	List<Order> findAllOrderByUserId(Long id);

	@Query(value = "select * from orders where status = 1", nativeQuery = true)
	List<Order> findAllOrderWait();

	@Query(value = "select * from orders where user_id = ? and status = 0", nativeQuery = true)
	List<Order> findAllOrderCancelByUserId(Long id);

	@Query(value = "select * from orders where user_id = ? and status = 1", nativeQuery = true)
	List<Order> findAllOrderWaitByUserId(Long id);

	@Query(value = "select * from orders where user_id = ? and status = 2", nativeQuery = true)
	List<Order> findAllOrderConfirmedByUserId(Long id);

	@Query(value = "select * from orders where user_id = ? and status = 3", nativeQuery = true)
	List<Order> findAllOrderPaidByUserId(Long id);

	// thong ke
	@Query(value = "select sum(amount), month(order_date) from orders\r\n"
			+ "where year(order_date) = ? and status = 3\r\n" + "group by month(order_date)", nativeQuery = true)
	List<Object[]> getStatisticalMonthYear(int year);
	
	@Query(value = "select year(order_date), order_date, sum(amount), count(id) from orders where status = 3 group by year(order_date)", nativeQuery = true)
	List<Object[]> getStatisticalYear();
	
	@Query(value = "select sum(amount), year(order_date), order_date, count(id) from orders where status = 3 group by month(order_date)", nativeQuery = true)
	List<Object[]> getStatisticalMonth();
	
	@Query(value = "select day(order_date), order_date, sum(amount), count(id) from orders where status = 3\r\n"
			+ "group by day(order_date)", nativeQuery = true)
	List<Object[]> getStatisticalDate();

	@Query(value = "select year(order_date) from orders group by year(order_date)", nativeQuery = true)
	List<Integer> getYears();
}
