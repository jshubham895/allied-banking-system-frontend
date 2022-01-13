import { useEffect, useState } from "react";
import Axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import formatter from "../../formatter";

function Accounts() {
	const [accountsList, setAccountsList] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			await getAccounts();
			setLoading(false);
		};
		fetchData();
	}, []);

	const getAccounts = async () => {
		await Axios.get(
			"https://allied-banking-system.herokuapp.com/accounts"
		).then((response) => {
			setAccountsList(response.data.reverse());
		});
	};

	const deleteAccount = async (_id) => {
		await Axios.delete(
			`https://allied-banking-system.herokuapp.com/accounts/${_id}`
		);
		getAccounts();
	};

	const LoadingScreen = () => {
		return (
			<div className="divLoader">
				<svg
					className="svgLoader"
					viewBox="0 0 100 100"
					width="10em"
					height="10em"
				>
					<path
						stroke="none"
						d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
						fill="#51CACC"
						transform="rotate(179.719 50 51)"
					>
						<animateTransform
							attributeName="transform"
							type="rotate"
							calcMode="linear"
							values="0 50 51;360 50 51"
							keyTimes="0;1"
							dur="1s"
							begin="0s"
							repeatCount="indefinite"
						></animateTransform>
					</path>
				</svg>
			</div>
		);
	};

	return (
		<div className="container">
			{loading ? <LoadingScreen /> : null}
			<hr />
			<Link className="btn-primary btn" to="/">
				Back
			</Link>
			<table className="table container shadow-lg mt-5">
				<thead className="table-dark">
					<tr>
						<th scope="col">#</th>
						<th scope="col">Name</th>
						<th scope="col">Email</th>
						<th scope="col">
							Balance ( <FontAwesomeIcon icon="rupee-sign" size="xs" /> )
						</th>
						<th scope="col" className="text-center">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{accountsList.map((val, key) => {
						return (
							<tr key={val._id}>
								<td>{key + 1}</td>
								<td>{val.name}</td>
								<td>{val.email}</td>
								<td>{formatter(val.balance)}</td>
								<td>
									<Link
										className="btn btn-outline-primary mr-2"
										to={`/accounts/view/${val._id}`}
									>
										<FontAwesomeIcon
											icon="money-bill"
											size="1x"
											className="mr-2"
										/>
										View and Transfer Money
									</Link>
									<Link
										className="btn btn-outline-success mr-2"
										to={`/accounts/edit/${val._id}`}
									>
										<FontAwesomeIcon icon="edit" size="1x" className="mr-2" />
										Edit
									</Link>
									<span
										className="btn btn-outline-danger mr-2"
										onClick={() => deleteAccount(val._id)}
									>
										<FontAwesomeIcon
											icon="trash-alt"
											size="1x"
											className="mr-2"
										/>
										Delete
									</span>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default Accounts;
