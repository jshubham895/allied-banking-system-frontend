import { useEffect, useState } from "react";
import Axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../layout/Footer";

function Transcations() {
	const [transactionsList, setTransactionsList] = useState([]);

	useEffect(() => {
		getAccounts();
	}, []);

	const getAccounts = async () => {
		await Axios.get(
			"https://allied-banking-system.herokuapp.com/transactions"
		).then((response) => {
			setTransactionsList(response.data.reverse());
		});
	};

	return (
		<div>
			<div className="container">
				<hr />
				<Link className="btn-primary btn" to="/accounts">
					Back
				</Link>
				<table className="table container shadow-lg mt-5">
					<thead className="table-dark">
						<tr>
							<th scope="col">#</th>
							<th scope="col">Sender</th>
							<th scope="col">Receiver</th>
							<th scope="col">
								Amount ( <FontAwesomeIcon icon="rupee-sign" size="sm" /> )
							</th>
							<th scope="col">Date and Time</th>
						</tr>
					</thead>
					<tbody>
						{transactionsList.map((val, key) => {
							return (
								<tr key={val._id}>
									<th scope="row">{key + 1}</th>
									<td>{val.from}</td>
									<td>{val.to}</td>
									<td>{val.amountExchange}</td>
									<td>
										{val.day}/{val.month}/{val.year} &nbsp;&nbsp;&nbsp;{" "}
										{val.hour}:{val.minute}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<div>
				<Footer />
			</div>
		</div>
	);
}

export default Transcations;
