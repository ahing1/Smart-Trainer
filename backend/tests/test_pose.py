import unittest
from app import app

class TestPoseEstimation(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_no_file_uploaded(self):
        response = self.app.post("/analyze_pose", data={})
        self.assertEqual(response.status_code, 400)
        self.assertIn("error", response.get_json())

    def test_valid_image_upload(self):
        with open("test_image.jpg", "rb") as img:
            response = self.app.post("/analyze_pose", data={"file": img})
            self.assertEqual(response.status_code, 200)
            self.assertIn("keypoints", response.get_json())

if __name__ == "__main__":
    unittest.main()
