export const formatearDinerto = cantidad => {
    return cantidad.toLocaleString('en-US', {
        style: 'currency',
        currency: 'EUR'
    })
} 