import '../../sass_main/_layout.scss';
import './_App.scss';
import React from 'react';
import axios from 'axios';
import TextInput from '../TextInput/TextInput';
import Dropdown from '../Dropdown/Dropdown';

class App extends React.Component {
    state = {
        amount: null,
        from: '',
        to: '',
        result: null,
        exchangeRate: null,
        error: ''
    };

    // Request exchange rate with axios
    getCurrencyExchange = async () => {
        const { data } = await axios.get(
            `${process.env.REACT_APP_URL}/exchangerate/${this.state.from}/${this.state.to}`
        );

        await this.setState({ exchangeRate: data });
    };

    // Returns result
    calculateCurrency = (exchangeRate) => {
        if (exchangeRate < 1) {
            return this.setState({
                result: this.state.amount / this.state.exchangeRate,
            });
        } else {
            return this.setState({
                result: this.state.amount * this.state.exchangeRate,
            });
        }
    };

    // Form event handler
    onFormSubmit = async (event) => {
        event.preventDefault();

        if (
            this.state.from === '' ||
            this.state.to === '' ||
            this.state.amount === null
            
        ) {
            this.setState({ error: 'Please fill all fields' })
        } else {
            // wait for setState to get the correct result state value
            await this.getCurrencyExchange();
            await this.calculateCurrency();
            this.setState({ error: '' })
        }
    };

    // Grab Amount from TextInput
    onAmountValueSubmit = (term) => {
        this.setState({ amount: term });
    };

    // Grab "from" currency from Dropdown
    onFromCurrencyChoice = (countryValue) => {
        this.setState({ from: countryValue });
    };

    // Grab "to" currency from Dropdown
    onToCurrencyChoice = (countryValue) => {
        this.setState({ to: countryValue });
    };

    // pass name as prop to have [e.target.name] same as the state to update dynamically

    render() {
        return (
            <div className="container">
                <h1 className="title">Live Currency Converter</h1>
                <div className="container__main">
                    <div className="bg-img">
                        <form onSubmit={this.onFormSubmit}>
                            <TextInput
                                title={'Amount'}
                                type={'number'}
                                sendValue={this.onAmountValueSubmit}
                            />
                            <Dropdown
                                onChange={this.onFromCurrencyChoice}
                                title={'From'}
                            />
                            <Dropdown
                                onChange={this.onToCurrencyChoice}
                                title={'To'}
                            />

                            <div className="button-go-container">
                                <input
                                    className="button-go"
                                    type="submit"
                                    value="Go"
                                    id="submit-button"
                                ></input>
                            </div>
                            <p className="error">{this.state.error}</p>
                        </form>

                        <div className="result-container">
                            <p className="result">
                                {Math.round(
                                    (this.state.result + Number.EPSILON) * 100
                                ) / 100}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
