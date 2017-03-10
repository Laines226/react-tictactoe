import React from 'react';

class PlayingFieldSection extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleSectionClick = this.handleSectionClick.bind(this);
    }
    handleSectionClick() {
        console.log("PlayingFieldSection handleSectionClick [this.props]", this.props);
        this.props.onSectionClick(this.props.xAxis, this.props.yAxis);
    }
    render() {
        let sectionParagraphCn = this.props.content.isFullLine ? 'inLineP' : 'normalP';
        return <td id={'' + this.props.xAxis +  this.props.yAxis} onClick={this.handleSectionClick}><p className={sectionParagraphCn}>{this.props.content.symbol}</p></td>;
    }
}

class PlayingField extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleSectionClick = this.handleSectionClick.bind(this);
    }
    handleSectionClick(xAxis, yAxis) {
        this.props.onSectionClick(xAxis, yAxis);
    }
    render() {
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <PlayingFieldSection content={this.props.playingField[0][0]} onSectionClick={this.handleSectionClick} xAxis={0} yAxis={0} />
                            <PlayingFieldSection content={this.props.playingField[0][1]} onSectionClick={this.handleSectionClick} xAxis={0} yAxis={1} />
                            <PlayingFieldSection content={this.props.playingField[0][2]} onSectionClick={this.handleSectionClick} xAxis={0} yAxis={2} />
                        </tr>
                        <tr>
                            <PlayingFieldSection content={this.props.playingField[1][0]} onSectionClick={this.handleSectionClick} xAxis={1} yAxis={0} />
                            <PlayingFieldSection content={this.props.playingField[1][1]} onSectionClick={this.handleSectionClick} xAxis={1} yAxis={1} />
                            <PlayingFieldSection content={this.props.playingField[1][2]} onSectionClick={this.handleSectionClick} xAxis={1} yAxis={2} />
                        </tr>
                        <tr>
                            <PlayingFieldSection content={this.props.playingField[2][0]} onSectionClick={this.handleSectionClick} xAxis={2} yAxis={0} />
                            <PlayingFieldSection content={this.props.playingField[2][1]} onSectionClick={this.handleSectionClick} xAxis={2} yAxis={1} />
                            <PlayingFieldSection content={this.props.playingField[2][2]} onSectionClick={this.handleSectionClick} xAxis={2} yAxis={2} />
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

class TicTacToe extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            playingField: [[{ symbol: " ", isFullLine: false }, { symbol: " ", isFullLine: false }, { symbol: " ", isFullLine: false }], [{ symbol: " ", isFullLine: false }, { symbol: " ", isFullLine: false }, { symbol: " ", isFullLine: false }], [{ symbol: " ", isFullLine: false }, { symbol: " ", isFullLine: false }, { symbol: " ", isFullLine: false }]],
            scoreX: 0,
            scoreO: 0
        }
        this.playerXsTurn = true;

        this.symbolPlayerX = 'X';
        this.symbolPlayerO = 'O';
        this.defaultValue = " ";

        this.handleSectionClick = this.handleSectionClick.bind(this);
        this.handleResetButtonClick = this.handleResetButtonClick.bind(this);
        this.checkThreeInARow = this.checkThreeInARow.bind(this);
    }
    reset() {
        this.setState({ playingField: [[{ symbol: " ", isFullLine: false }, { symbol: " ", isFullLine: false }, { symbol: " ", isFullLine: false }], [{ symbol: " ", isFullLine: false }, { symbol: " ", isFullLine: false }, { symbol: " ", isFullLine: false }], [{ symbol: " ", isFullLine: false }, { symbol: " ", isFullLine: false }, { symbol: " ", isFullLine: false }]] });
    }
    checkThreeInARow() {
        console.log("begin checkThreeInARow");
        let playingField = this.state.playingField;
        let win = 'n'
        let isPlayingFieldFull = true;
        for (let oneAxis = 0; oneAxis < playingField.length; oneAxis++) {
            if (playingField[oneAxis][0].symbol === this.defaultValue || playingField[oneAxis][1].symbol === this.defaultValue || playingField[oneAxis][2].symbol === this.defaultValue) {
                isPlayingFieldFull = false;
                // console.log("xAxis has empty Value : [onAxis], [playingField[oneAxis][0].symbol]", oneAxis, playingField[oneAxis][0].symbol);
            }
            // else{
            //     console.log("xAxis is full : [onAxis]", oneAxis);
            // }
            if (playingField[oneAxis][0].symbol !== this.defaultValue && playingField[oneAxis][0].symbol === playingField[oneAxis][1].symbol && playingField[oneAxis][0].symbol === playingField[oneAxis][2].symbol) {
                playingField[oneAxis][0].isFullLine = true;
                playingField[oneAxis][1].isFullLine = true;
                playingField[oneAxis][2].isFullLine = true;
                win = playingField[oneAxis][0].symbol;
            }
            if (playingField[0][oneAxis].symbol !== this.defaultValue && playingField[0][oneAxis].symbol === playingField[1][oneAxis].symbol && playingField[0][oneAxis].symbol === playingField[2][oneAxis].symbol) {
                playingField[0][oneAxis].isFullLine = true;
                playingField[1][oneAxis].isFullLine = true;
                playingField[2][oneAxis].isFullLine = true;
                win = playingField[0][oneAxis].symbol;
            }
        }
        if (playingField[0][0].symbol !== this.defaultValue && playingField[0][0].symbol === playingField[1][1].symbol && playingField[0][0].symbol === playingField[2][2].symbol) {
            playingField[0][0].isFullLine = true;
            playingField[1][1].isFullLine = true;
            playingField[2][2].isFullLine = true;
            win = playingField[0][0].symbol;
        }
        if (playingField[0][2].symbol !== this.defaultValue && playingField[0][2].symbol === playingField[1][1].symbol && playingField[0][2].symbol === playingField[2][0].symbol) {
            playingField[0][2].isFullLine = true;
            playingField[1][1].isFullLine = true;
            playingField[2][0].isFullLine = true;
            win = playingField[0][2].symbol;
        }
        if (win === 'n' && isPlayingFieldFull) {
            win = 'd';
        }
        console.log("end checkThreeInARow [win]", win);
        return win;
    }
    handleResetButtonClick(event) {
        this.reset();
    }
    handleSectionClick(xAxis, yAxis) {
        let playingField = this.state.playingField;
        console.log("TicTacToe handleSectionClick start [playingField],[xAxis],[yAxis]", playingField, xAxis, yAxis);

        let resultOfCheck = this.checkThreeInARow();

        if (playingField[xAxis][yAxis].symbol === this.defaultValue && resultOfCheck === 'n') {
            playingField[xAxis][yAxis].symbol = this.playerXsTurn ? this.symbolPlayerX : this.symbolPlayerO;
            this.playerXsTurn = !this.playerXsTurn;
        }
        console.log("TicTacToe handleSectionClick stop [playingField]", playingField);
        this.setState({ playingField: playingField });

        // recalculate ResultCheck
        resultOfCheck = this.checkThreeInARow();
        if (resultOfCheck === this.symbolPlayerX) {
            this.setState(prevState => ({ scoreX: prevState.scoreX + 1 }));
        }
        if (resultOfCheck === this.symbolPlayerO) {
            this.setState(prevState => ({ scoreO: prevState.scoreO + 1 }));
        }
        
        if (resultOfCheck === 'd') {
            this.setState(prevState => ({ scoreO: prevState.scoreO + 0.5 , scoreX: prevState.scoreX + 0.5 }));
        }

    }
    render() {
        let renderWhosTurnOrWinner = <div> Player {this.playerXsTurn ? this.symbolPlayerX : this.symbolPlayerO}'s turn</div>
        let winner = this.checkThreeInARow()
        if (winner !== 'n' && winner !== 'd') {
            renderWhosTurnOrWinner = <div> Player {winner} wins! <button onClick={this.handleResetButtonClick} value="next round" >next round</button></div>;
        }
        else if (winner === 'd') {
            renderWhosTurnOrWinner = <div> Draw <button onClick={this.handleResetButtonClick} value="next round" >next round</button></div>;
        }
        return (
            <div>
                <h2>Tic Tac Toe</h2>
                <div>Score: Player X: {this.state.scoreX} - Player O: {this.state.scoreO}</div>
                <PlayingField playingField={this.state.playingField} onSectionClick={this.handleSectionClick} />
                {renderWhosTurnOrWinner}
            </div>
        );
    }
}

export default TicTacToe;