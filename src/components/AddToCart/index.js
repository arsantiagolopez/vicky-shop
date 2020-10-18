import React, {useState} from 'react'
import {Icon, Label, Transition} from 'semantic-ui-react'
import './index.css'

const AddToCart = ({location, number}) => {
  const [clicked, setClicked] = useState(false)

  const handleSubmit = async () => {
    setClicked(true)
  }

  // Encode WhatsApp message
  const priceInquiry = `Que precio tiene este artículo? ${location.href}`
  const urlEncodedPriceInquiry = priceInquiry.replace(/\s+/g, '%20')
  const priceInquiryWhatsappHref = `https://wa.me/${number}/?text=${urlEncodedPriceInquiry}`

  return (
    <Label
      as="a"
      href={priceInquiryWhatsappHref}
      className={clicked ? 'addToCartSuccess' : 'addToCartButton'}
      onClick={handleSubmit}
      disabled={clicked}
    >
      {clicked ? null : (
        <>
          <Icon name="whatsapp" />
          Preguntar por Precio
        </>
      )}
      <Transition
        duration={{hide: -50, show: 500}}
        animation="scale"
        visible={clicked}
      >
        <div className="addToCartSuccess">
          <Icon name="whatsapp" />
          Sigue los pasos en Whatsapp
        </div>
      </Transition>
    </Label>
  )
}

export default AddToCart
