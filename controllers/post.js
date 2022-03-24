const Comment = require("../models/comment");
const Post = require("../models/post");



const createPost = async(req, res) => {

	const { text } = req.body;
	const user_id = req.uid;

	const post = new Post({ text, user_id });

	await post.save();
	
	res.json({ 
		ok: true,
		message: 'Post saved',
		post,
	});


}

const likePost = async(req, res) => {

	// thanks copylot ;)
	const { id } = req.params;

	const post = await Post.findById(id);

	if(!post) {
		return res.status(404).json({
			ok: false,
			message: 'Post not found',
		});
	}

	if (post.likes.includes(req.uid)) {
		return res.status(400).json({
			ok: false,
			message: 'Post already liked',
		});
	}

	post.likes.push(req.uid);

	await post.save();

	res.json({
		ok: true,
		 message: 'Post liked',
		post,
	});

}

const removeLike = async(req, res) => {

	const { id } = req.params;

	const post = await Post.findById(id);

	if( !post ){
		return res.status(404).json({
			ok: false,
			message: 'Post not found',
		});
	}

	if( !post.likes.includes(req.uid) ){
		return res.status(400).json({
			ok: false,
			message: 'Post not liked',
		});
	}

	// search index of the like
	const index = post.likes.indexOf(req.uid);

	// remove from index
	post.likes.splice(index, 1);

	await post.save();

	res.json({
		ok: true,
		message: 'Post unliked',
		post
	})


}


const retweetPost = async(req, res) => {

	const { id } = req.params;

	const post = await Post.findById(id);

	if( !post ){
		return res.status(404).json({
			ok: false,
			message: 'Post not found',
		});
	}

	if( post.retweet.includes( req.uid ) ){
		return res.status(400).json({
			ok: false,
			message: 'Post already retweeted',
		});
	}

	post.retweet.push( req.uid );

	await post.save();

	res.json({
		ok: true,
		message: 'Post retweeted',
		post
	})


}

const removeRetweet = async(req, res) => {

	const { id } = req.params;

	const post = await Post.findById( id );
	
	if( !post ){
		return res.status(404).json({
			ok: false,
			message: 'Post not found',
		});
	}

	if( !post.retweet.includes( req.uid ) ){
		return res.status(400).json({
			ok: false,
			message: 'Post not retweeted',
		});
	}

	const index = post.retweet.indexOf( req.uid );

	post.retweet.splice( index, 1 );

	await post.save();

	res.json({
		ok: true,
		message: 'Post unretweeted',
		post
	});


}



const commentPost = async(req, res) => {

	const { text } = req.body;
	const { id } = req.params;

	const post = await Post.findById(id);

	if( !post ){
		return res.status(404).json({
			ok: false,
			message: 'Post not found',
		});
	}

	const comment = new Comment( { text, post_id: id, user_id: req.uid } );

	post.comments.push(comment.id);

	await comment.save();
	await post.save();


	res.json({
		ok: true,
		message: 'Comment saved',
		comment,
		post
	})
}

const getPost = async(req, res) => {
	
	const { id } = req.params;

	const post = await Post.findById(id).populate('comments')

	if( !post ){
		return res.status(404).json({
			ok: false,
			message: 'Post not found',
		});
	}

	res.json({
		ok: true,
		post
	});

}


// Remember son
/*

	Focus at Server, Request is message that arrive to server for request something. 
	Response is message that send from server to client for give thing that client what.
*/

module.exports = {
	createPost,
	likePost,
	removeLike,
	retweetPost,
	removeRetweet,
	commentPost,
	getPost
}