package com.parentsphere.parentsphere.exceptions;



import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Date;


//@RestControllerAdvice
//public class CentralizedExceptionHandler extends ResponseEntityExceptionHandler {
//    @ExceptionHandler(ResourceAlreadyExistsException.class)
//    public ResponseEntity<ErrorResponseDto> handleTariffAlreadyExists(ResourceAlreadyExistsException ex, WebRequest request) {
//        return buildErrorResponse(ex, HttpStatus.CONFLICT);
//    }
//
//    @ExceptionHandler(ResourceNotFoundException.class)
//    public ResponseEntity<ErrorResponseDto> handleItemExistsException(ResourceNotFoundException ex, WebRequest request) {
//        return buildErrorResponse(ex, HttpStatus.NOT_FOUND);
//    }
//
//    private ResponseEntity<ErrorResponseDto> buildErrorResponse(RuntimeException ex, HttpStatus status) {
//        ErrorResponseDto errorResponse = new ErrorResponseDto();
//        errorResponse.setStatusCode(status.value());
//        errorResponse.setMessage(ex.getMessage());
//        errorResponse.setTimestamp(new Date());
//
//        return new ResponseEntity<>(errorResponse, status);
//    }
//
//
//
//
//
//}