package com.mshop.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MailInfo {
	String from;
	String to;
	String subject;
	String body;
	String attachments;

	public MailInfo(String to, String subject, String body) {
		this.from = "Monitor Shop <poly@fpt.edu.vn>";
		this.to = to;
		this.subject = subject;
		this.body = body;
	}
	
}
