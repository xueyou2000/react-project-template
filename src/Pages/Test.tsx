import React, { useState } from "react";
import PageHeaderLayout from '@/Components/PageHeaderLayout';

export default function TestPage() {

    return (
        <PageHeaderLayout title="测试页面" cardType={true}>
            <p>todo....</p>
            <input type="text" />
        </PageHeaderLayout>
    );
}
