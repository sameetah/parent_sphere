package com.parentsphere.parentsphere.exceptions;

public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(String message) {
        super(message);
    }


    public ResourceNotFoundException(String post, String id, long postId) {
    }
}