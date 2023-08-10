package com.postgresql.connect.utils;

import java.util.List;

public class PaginatedResponse<T> {
    private List<T> data;
    private long totalRecords;

    public PaginatedResponse(List<T> data, long totalRecords) {
        this.data = data;
        this.totalRecords = totalRecords;
    }

    // Getters y setters
    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }

    public long getTotalRecords() {
        return totalRecords;
    }

    public void setTotalRecords(long totalRecords) {
        this.totalRecords = totalRecords;
    }
}
