package com.avocado.live.board.domain.entity;//
//package com.avocado.normal.board.domain.entity;
//
//import javax.validation.Constraint;
//import javax.validation.Payload;
//import java.lang.annotation.ElementType;
//import java.lang.annotation.Retention;
//import java.lang.annotation.RetentionPolicy;
//import java.lang.annotation.Target;
//
//@Constraint(validatedBy = {EnumValidator.class})
//@Target({ElementType.METHOD, ElementType.FIELD, ElementType.PARAMETER})
//@Retention(RetentionPolicy.RUNTIME)
//public @interface EnumValid {
//    String message() default "유효하지 않은 Enum값 입니다";
//    Class<?>[] groups() default {};
//    Class<? extends Payload>[] payload() default {};
//    Class<? extends java.lang.Enum<?>> enumClass();
//    boolean ignoreCase() default false;
//}