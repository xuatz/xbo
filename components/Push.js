const layoutStyle = {
	border: "1px solid #DDD",
	padding: "10px"
};

const renderPushType = (
	{
		iden,
		type,
		title,
		body,
		url,
		created,
		modified,
		image_url,
		file_name,
		file_type,
		file_url
	} = push
) => {
	if (body) {
		return (
			<p style={{ wordWrap: "break-word" }}>
				{body}
			</p>
		);
	}

	if (image_url) {
		return (
			<div>
				<h3>
					<PushUrl url={file_url} displayText={file_name} />
				</h3>
				<img src={image_url} />
				<div style={{ padding: "10px 0px" }}>
					<div>
						image_url: <PushUrl url={image_url} />
					</div>
				</div>
			</div>
		);
	}

	if (file_name) {
		return (
			<a href={file_url}>
				<p style={{ wordWrap: "break-word" }}>
					{file_name}
				</p>
			</a>
		);
	}

	if (url) {
		return <PushUrl url={url} displayText={title} header={true} />;
	}
};

const Push = props => {
	let { push } = props;
	let {
		iden,
		type,
		title,
		body,
		url,
		create,
		modified,
		image_url,
		file_name,
		file_type,
		file_url
	} = push.pushBody;

	return (
		<div style={layoutStyle}>
			{title && !url ? <h2>{title}</h2> : null}
			{renderPushType(push.pushBody)}
		</div>
	);
};

const PushUrl = props => {
	let {
		header = false,
		url,
		displayText = url.substring(0, 30) + "..."
	} = props;

	return (
		<a href={props.url}>
			{header
				? <h2>
						<span style={{ wordWrap: "break-word" }}>
							{displayText}
						</span>
					</h2>
				: <span style={{ wordWrap: "break-word" }}>
						{displayText}
					</span>}
		</a>
	);
};

export default Push;
