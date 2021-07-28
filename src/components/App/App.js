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
    };

    // Request exchange rate with axios
    getCurrencyExchange = async () => {
        const { data } = await axios.get(
            `https://api.exchangeratesapi.io/latest?base=${this.state.from}`
        );
        console.log(data)
        
        const dataEntries = Object.entries(data.rates);

        dataEntries.map((dataEntry) => {
            return dataEntry[0] === this.state.to
                ? this.setState({ exchangeRate: dataEntry[1] })
                : null;
        });
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

        // wait for setState to get the correct result state value
        await this.getCurrencyExchange();
        await this.calculateCurrency();
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