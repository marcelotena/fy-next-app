import { Component } from 'react'

export default class Invoice extends Component {


    render() {
        const { post } = this.props

        return (
            <div className='Invoice'>
                <h1 className='Invoice__title'>{post.title.rendered}</h1>

                <div className='Invoice__total' dangerouslySetInnerHTML={{ __html: (parseFloat(post.acf.base_imponible) + (parseFloat(post.acf.iva)/100*parseFloat(post.acf.base_imponible)) - parseFloat(post.acf.irpf)/100*parseFloat(post.acf.base_imponible)).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) }}></div>
                <div className='Invoice__base-imponible' dangerouslySetInnerHTML={{ __html: (parseFloat(post.acf.base_imponible).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })) }}></div>
                <div className='Invoice__iva' dangerouslySetInnerHTML={{ __html: (parseFloat(post.acf.iva)/100*parseFloat(post.acf.base_imponible)).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) }}></div>
                <div className='Invoice__irpf' dangerouslySetInnerHTML={{ __html: "-" + (parseFloat(post.acf.irpf)/100*parseFloat(post.acf.base_imponible)).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) }}></div>

                <style jsx>{`
                    .Invoice__title {
                        width: 100%;

                    }
                `}</style>
            </div>
        )
    }
}