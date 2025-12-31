import OwnerLayout from '@/core/layouts/OwnerLayout'
import React from 'react'

function layout({ children }: { children: React.ReactNode }) {
    return (
        <OwnerLayout>
            {children}
        </OwnerLayout>
    )
}

export default layout