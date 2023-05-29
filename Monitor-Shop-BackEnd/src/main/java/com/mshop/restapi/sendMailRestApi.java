package com.mshop.restapi;

import java.text.DecimalFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mshop.entity.Order;
import com.mshop.entity.OrderDetail;
import com.mshop.repository.OrderDetailRepository;
import com.mshop.repository.UserRepository;
import com.mshop.service.SendMailService;

@CrossOrigin("*")
@RestController
@RequestMapping("api/send-mail")
public class sendMailRestApi {

	@Autowired
	OrderDetailRepository ODrepo;

	@Autowired
	SendMailService sendMail;
	
	@Autowired
	UserRepository Urepo;

	@PostMapping("/order")
	public ResponseEntity<Void> sendMail(@RequestBody Order o) {
		if (o.getStatus() == 0) {
			sendMailOrder(o, "Huỷ đơn hàng thành công!", "Đơn hàng của bạn đã huỷ thành công!");
		} else if (o.getStatus() == 1) {
			sendMailOrder(o, "Chúc mừng đã đặt hàng thành công!", "Đơn hàng của bạn đã đặt hàng thành công!");
		} else if (o.getStatus() == 2) {
			sendMailOrder(o, "Chúc mừng đã đặt hàng thành công!", "Đơn hàng của bạn đã được xác nhận thành công!");
		} else if (o.getStatus() == 3) {
			sendMailOrder(o, "Chúc mừng đã thanh toán thành công!", "Đơn hàng của bạn đã thanh toán thành công!");
		}

		return ResponseEntity.ok().build();
	}

	@PostMapping("/otp")
	public ResponseEntity<Integer> sendOpt(@RequestBody String email) {
		int random_otp = (int) Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
		if(Urepo.existsByEmail(email)) {
			return ResponseEntity.notFound().build();
		}
		sendMailOtp(email, random_otp, "Xác nhận tài khoản!");
		return ResponseEntity.ok(random_otp);
	}
	
	@PostMapping("/otp-forgot-password")
	public ResponseEntity<Integer> sendOpt1(@RequestBody String email) {
		int random_otp = (int) Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
		if(!Urepo.existsByEmail(email)) {
			return ResponseEntity.notFound().build();
		}
		sendMailOtp(email, random_otp, "Quên mật khẩu?");
		return ResponseEntity.ok(random_otp);
	}

	// format currency
	public String format(String number) {
		DecimalFormat formatter = new DecimalFormat("###,###,###.##");

		return formatter.format(Double.valueOf(number)) + " VNĐ";
	}

	// sendmail
	public void sendMailOtp(String email, int Otp, String title) {
		String body = "<div>\r\n"
				+ "        <h3>Mã OTP của bạn là: <span style=\"color:red; font-weight: bold;\">" + Otp
				+ "</span></h3>\r\n" + "    </div>";
		sendMail.queue(email, title, body);
	}

	// sendmail
	public void sendMailOrder(Order order, String subtitle, String title) {
		List<OrderDetail> list = ODrepo.findOrderDetailByOrderId(order.getId());

		StringBuilder content = new StringBuilder();

		content.append(
				"<div style=\"width: 50%; margin: auto; min-height: 500px; background-color: whitesmoke; border-radius: 10px;\">\r\n"
						+ "        <h2 style=\"text-align: center; padding: 20px; font-family: Arial, Helvetica, sans-serif;\">"
						+ subtitle + "</h2>\r\n" + "        <br>\r\n"
						+ "        <div style=\"margin-left: 10px; margin-right: 10px;\">\r\n"
						+ "            <p>Xin chào, " + order.getUser().getName() + " !</p>\r\n"
						+ "            <br>\r\n" + "            <p>" + title + "</p>\r\n" + "            <hr>");
		for (OrderDetail item : list) {
			content.append(
					"\r\n" + "            <div style=\"display: flex; margin-top: 10px; margin-left: 20px;\">\r\n"
//					+ "                <img src=\""+item.getProduct().getImage()+"\"\r\n"
//					+ "                    width=\"100px\">\r\n"
							+ "                <ul style=\"list-style-type: none;\">\r\n"
							+ "                    <li style=\"font-weight: bold;\">" + item.getProduct().getName()
							+ "</li>\r\n" + "                    <li>Số lượng: " + item.getQuantity() + "</li>\r\n"
							+ "                    <li>Tổng tiền: " + format(String.valueOf(item.getPrice()))
							+ "</li>\r\n" + "                </ul>\r\n" + "            </div>");
		}
		content.append("<div style=\"margin-top: 20px;\">\r\n"
				+ "                <p style=\"font-size: 18px; font-weight: bold;\">Tổng tiền: <span style=\"color: crimson; font-style: italic;\">"
				+ format(String.valueOf(order.getAmount())) + "</span></p>\r\n" + "            </div>\r\n"
				+ "            <div style=\"margin-top: 20px;\">\r\n"
				+ "                <p style=\"font-family: Arial, Helvetica, sans-serif; font-weight: bold;\">Cám ơn bạn đã tin tưởng chúng tôi!</p>\r\n"
				+ "                <p style=\"font-family: Arial, Helvetica, sans-serif; font-weight: bold;\">Chúc bạn 1 ngày mới vui vẻ!</p>\r\n"
				+ "            </div> \r\n" + "        </div>\r\n" + "    </div>");
		sendMail.queue(order.getUser().getEmail(), subtitle, content.toString());
	}
}
