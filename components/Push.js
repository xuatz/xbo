const styles = {
	push: {
		display: 'block',
		border: '1px solid #DDD',
		padding: '10px'
	},
	url: {
		wordWrap: 'break-word'
	}
};

const PushUrl = props => {
	let {
		header = false,
		url,
		displayText = url.substring(0, 30) + '...'
	} = props;

	return (
		<a href={props.url}>
			{header
				? <h2>
						<span style={styles.url}>
							{displayText}
						</span>
					</h2>
				: <span style={styles.url}>
						{displayText}
					</span>}
		</a>
	);
};

const renderPushType = push => {
	let {
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
	} = push;

	switch (type) {
		case 'link':
			//TODO xz: dunno which part of the code, should make use of
			//push.body == '#guide'
			return <PushUrl url={url} displayText={title} header={true} />;
		case 'note':
			//TODO xz: dunno which part of the code, should make use of
			//push.body == '#guide' || '#todo'
			return (
				<p style={{ wordWrap: 'break-word' }}>
					{body}
				</p>
			);
		case 'file':
			if (image_url) {
				return (
					<div>
						<h3>
							<PushUrl url={file_url} displayText={file_name} />
						</h3>
						<img
							style={{
								maxWidth: '100%'
							}}
							src={image_url}
						/>
						<div style={{ padding: '10px 0px' }}>
							<div>
								image_url: <PushUrl url={image_url} />
							</div>
						</div>
					</div>
				);
			} else {
				return (
					<a href={file_url}>
						<p style={{ wordWrap: 'break-word' }}>
							{file_name}
						</p>
					</a>
				);
			}
		default:
			console.log('unhandled type:', type);
			console.log(push);
			return (
				<p>
					type: {type}
				</p>
			);
	}
};

const Push = ({ data }) => {
	let {
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
	} = data;

	return (
		<div style={styles.push}>
			{title && !url ? <h2>{title}</h2> : null}
			{renderPushType(data)}
		</div>
	);
};

export default Push;
