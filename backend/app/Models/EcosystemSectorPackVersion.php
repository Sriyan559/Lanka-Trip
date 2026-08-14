<?php
namespace App\Models; use Illuminate\Database\Eloquent\Model;
class EcosystemSectorPackVersion extends Model {protected $fillable=['uuid','sector_pack_id','version','status','release_channel','release_notes','target_release_at','released_at','released_by','lock_version'];protected function casts():array{return['target_release_at'=>'datetime','released_at'=>'datetime'];}}
