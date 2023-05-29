package com.mshop.entity;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@SuppressWarnings("serial")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Statistical implements Serializable{
	private int month;
	private Date date;
	private Double amount;
	private BigInteger count;
}
