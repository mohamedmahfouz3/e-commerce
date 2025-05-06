import { useEffect } from 'react'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'

interface PayPalButtonProps {
  total: number
  onSuccess: (details: any) => void
  onError: (error: any) => void
}

export default function PayPalButton({ total, onSuccess, onError }: PayPalButtonProps) {
  const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    currency: 'USD',
    intent: 'capture',
  }

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className="w-full max-w-md mx-auto">
        <PayPalButtons
          style={{
            layout: 'vertical',
            color: 'blue',
            shape: 'rect',
            label: 'pay',
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: total.toString(),
                    currency_code: 'USD',
                  },
                },
              ],
            })
          }}
          onApprove={async (data, actions) => {
            if (actions.order) {
              const details = await actions.order.capture()
              onSuccess(details)
            }
          }}
          onError={(err) => {
            onError(err)
          }}
        />
      </div>
    </PayPalScriptProvider>
  )
} 