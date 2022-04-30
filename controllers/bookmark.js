const Bookmark = require("../models/bookmark");
const User = require("../models/user");
const Post = require("../models/post");

const createBookmark = async(req, res) => {

	const { folder } = req.body;
	const userId = req.uid;

	const bookmark = new Bookmark({ folder, userId });

	bookmark.populate('userId', 'name email username img');

	await bookmark.save();

	res.json({
		ok: true,
		message: "Bookmark created successfully",
		bookmark
	});

}

const addPostToBookmark = async(req, res) => {

	const { id, postId } = req.params;

	const post = await Post.findById( postId ).populate('user_id', 'name email username img');

	const bookmark = await Bookmark.findById(id).populate({
		path: 'posts',
		populate: {
			path: 'user_id',
			select: 'name email username img'
		}
	});

	if (!bookmark) {
		return res.status(404).json({
			ok: false,
			message: "Bookmark not found"
		});
	}

	bookmark.posts.push(post);

	await bookmark.save();

	res.json({
		ok: true,
		message: "Post added to bookmark successfully",
		bookmark
	});


}

const removePostFromBookmark = async(req, res) => {

	const { id, postId } = req.params;


	const post = await Post.findById( postId ).populate('user_id', 'name email username img');

	const bookmark = await Bookmark.findById(id).populate({
		path: 'posts',
		populate: {
			path: 'user_id',
			select: 'name email username img'
		}
	});

	if (!bookmark) {
		return res.status(404).json({
			ok: false,
			message: "Bookmark not found"
		});
	}

	const index = bookmark.posts.indexOf(post);

	bookmark.posts.splice(index, 1);

	await bookmark.save();

	res.json({
		ok: true,
		message: "Post removed from bookmark successfully",
		bookmark
	});

}

const getBookmarks = async(req, res) => {

	const bookmarks = await Bookmark.find();

	res.json({
		ok: true,
		message: "Bookmarks retrieved successfully",
		bookmarks
	});


}


module.exports = {
	createBookmark,
	addPostToBookmark,
	removePostFromBookmark,
	getBookmarks
}