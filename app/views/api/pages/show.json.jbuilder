json.extract! @page, :id, :user_id, :title, :block_ids, :gallery_image_url, :uploaded_image_url, :icon, :created_at, :updated_at
json.uploaded_image_url url_for(@page.cover) if (@page.cover.attached?)